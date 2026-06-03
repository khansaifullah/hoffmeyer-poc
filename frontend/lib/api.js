import { getCatalogHref, getCategoryHref } from "@/lib/catalog-urls";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function getApiUrl(path = "") {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getBackendOrigin() {
  return API_URL.replace(/\/api\/?$/, "");
}

export function resolveImageUrl(url) {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/storage/")) {
    return `${getBackendOrigin()}${url}`;
  }

  return url;
}

export async function apiFetch(path, options = {}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("hoffmeyer_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(getApiUrl(path), {
    ...options,
    cache: "no-store",
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || data.errors?.email?.[0] || "Request failed";
    throw new Error(message);
  }

  return data;
}

function buildQuery(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

export function mapApiProduct(product) {
  if (!product) return null;

  const categoryIds =
    product.category_ids ||
    product.categories?.map((category) => category.id) ||
    (product.category_id ? [product.category_id] : []);

  const categories = product.categories?.map((category) => mapApiCategory(category)) || [];
  const category = product.category ? mapApiCategory(product.category) : categories[0] || null;

  return {
    id: product.id,
    categoryId: product.category_id,
    categoryIds,
    brandId: product.brand_id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.image,
    sku: product.sku,
    itemNumber: product.item_number,
    mfrNumber: product.mfr_number,
    material: product.material,
    description: product.description,
    inStock: product.in_stock,
    availabilityStatus: product.availability_status,
    factoryOrder: product.availability_status === "factory_order",
    isFeatured: product.is_featured,
    sortOrder: product.sort_order,
    category,
    categories,
    categorySlug: category?.slug,
    categoryHref: getCategoryHref(category),
    categoryName:
      categories.length > 0
        ? categories.map((category) => category.name).join(", ")
        : product.category?.name,
    brand: product.brand ? mapApiBrand(product.brand) : null,
    images: product.images || [],
    specs: product.specs || [],
  };
}

export function mapApiCategory(category, ancestors = []) {
  if (!category) return null;

  const ancestorChain = Array.isArray(ancestors) ? ancestors : [];
  const breadcrumb = category.breadcrumb?.length
    ? category.breadcrumb
    : [
        ...ancestorChain.map((node) => ({
          id: node.id,
          name: node.name,
          slug: node.slug,
          level: node.level,
        })),
        {
          id: category.id,
          name: category.name,
          slug: category.slug,
          level: category.level,
        },
      ];

  const catalogPath =
    category.catalog_path || breadcrumb.map((node) => node.slug).filter(Boolean).join("/");

  const mapped = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    level: category.level,
    image: category.image,
    description: category.description,
    heroDescription: category.hero_description,
    sortOrder: category.sort_order,
    isActive: category.is_active,
    isFeatured: category.is_featured,
    parentId: category.parent_id,
    catalogPath,
    breadcrumb,
    productsCount: category.products_count,
    products: category.products?.map(mapApiProduct) || [],
  };

  const node = {
    id: mapped.id,
    name: mapped.name,
    slug: mapped.slug,
    level: mapped.level,
  };

  return {
    ...mapped,
    href: category.href || (catalogPath ? `/category/${catalogPath}` : getCategoryHref(mapped)),
    children: category.children?.map((child) => mapApiCategory(child, [...ancestorChain, node])) || [],
  };
}

export function mapApiBrand(brand) {
  if (!brand) return null;

  return {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo: brand.logo,
    description: brand.description,
    isFeatured: brand.is_featured,
    isActive: brand.is_active,
    sortOrder: brand.sort_order,
    productsCount: brand.products_count,
    products: brand.products?.map(mapApiProduct) || [],
  };
}

export async function fetchCategories(params = {}) {
  const result = await apiFetch(`/categories${buildQuery(params)}`);
  return result.data.map((category) => mapApiCategory(category));
}

export async function fetchCategory(slug) {
  const result = await apiFetch(`/categories/${slug}`);
  return mapApiCategory(result.data);
}

export async function fetchCategoryTree() {
  return fetchCategories({ tree: true });
}

export async function fetchBrands(params = {}) {
  const result = await apiFetch(`/brands${buildQuery(params)}`);
  return result.data.map(mapApiBrand);
}

export async function fetchBrand(slug, params = {}) {
  const result = await apiFetch(`/brands/${slug}${buildQuery(params)}`);
  return mapApiBrand(result.data);
}

export async function fetchProducts(params = {}) {
  const result = await apiFetch(`/products${buildQuery(params)}`);
  return {
    products: result.data.map(mapApiProduct),
    meta: result.meta || null,
  };
}

export async function fetchProduct(slug) {
  const result = await apiFetch(`/products/${slug}`);
  return mapApiProduct(result.data);
}

export async function fetchGlobalSearch(query, limit = 5) {
  const result = await apiFetch(`/search${buildQuery({ q: query, limit })}`);
  return result.data;
}

/** @deprecated Use fetchProducts() which returns paginated results */
export async function fetchAllProducts() {
  const { products } = await fetchProducts({ per_page: 100 });
  return products;
}

export async function fetchAdminProducts(params = {}) {
  const result = await apiFetch(`/admin/products${buildQuery(params)}`);
  return {
    products: result.data.map(mapApiProduct),
    meta: result.meta || null,
  };
}

export async function fetchAdminProduct(id) {
  const result = await apiFetch(`/admin/products/${id}`);
  return mapApiProduct(result.data);
}

export async function createProduct(payload) {
  const result = await apiFetch("/admin/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapApiProduct(result.data);
}

export async function updateProduct(id, payload) {
  const result = await apiFetch(`/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return mapApiProduct(result.data);
}

export async function deleteProduct(id) {
  return apiFetch(`/admin/products/${id}`, { method: "DELETE" });
}

export async function importProducts(file) {
  const csv = await file.text();
  const result = await apiFetch("/admin/products/import", {
    method: "POST",
    body: JSON.stringify({ csv }),
  });

  return result.data;
}

export async function fetchAdminCategories(params = {}) {
  const result = await apiFetch(`/admin/categories${buildQuery(params)}`);
  return result.data.map((category) => mapApiCategory(category));
}

export async function fetchAdminCategory(id) {
  const result = await apiFetch(`/admin/categories/${id}`);
  return mapApiCategory(result.data);
}

export async function createCategory(payload) {
  const result = await apiFetch("/admin/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapApiCategory(result.data);
}

export async function updateCategory(id, payload) {
  const result = await apiFetch(`/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return mapApiCategory(result.data);
}

export async function deleteCategory(id) {
  return apiFetch(`/admin/categories/${id}`, { method: "DELETE" });
}

export function categoryToPayload(category) {
  return {
    parent_id: category.parent_id ? Number(category.parent_id) : null,
    level: category.level || undefined,
    name: category.name,
    slug: category.slug || "",
    image: category.image || "",
    description: category.description || "",
    hero_description: category.hero_description || category.heroDescription || "",
    sort_order: category.sort_order ?? category.sortOrder ?? 0,
    is_active: category.is_active ?? category.isActive ?? true,
  };
}

export async function fetchAdminBrands(params = {}) {
  const result = await apiFetch(`/admin/brands${buildQuery(params)}`);
  return result.data.map(mapApiBrand);
}

export async function fetchAdminBrand(id) {
  const result = await apiFetch(`/admin/brands/${id}`);
  return mapApiBrand(result.data);
}

export async function createBrand(payload) {
  const result = await apiFetch("/admin/brands", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapApiBrand(result.data);
}

export async function updateBrand(id, payload) {
  const result = await apiFetch(`/admin/brands/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return mapApiBrand(result.data);
}

export async function deleteBrand(id) {
  return apiFetch(`/admin/brands/${id}`, { method: "DELETE" });
}

export async function uploadAdminImage(file, folder = "products") {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  const headers = {
    Accept: "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("hoffmeyer_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(getApiUrl("/admin/uploads/image"), {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      data.errors?.image?.[0] ||
      "Image upload failed";
    throw new Error(message);
  }

  return data.data.url;
}

export function brandToPayload(brand) {
  return {
    name: brand.name,
    slug: brand.slug || "",
    logo: brand.logo || "",
    description: brand.description || "",
    is_featured: brand.is_featured ?? brand.isFeatured ?? false,
    is_active: brand.is_active ?? brand.isActive ?? true,
    sort_order: brand.sort_order ?? brand.sortOrder ?? 0,
  };
}

export function productToPayload(product) {
  const categoryIds =
    product.category_ids ||
    product.categoryIds ||
    (product.category_id ? [product.category_id] : []);

  return {
    category_ids: categoryIds.map(Number).filter(Boolean),
    brand_id: product.brand_id || null,
    name: product.name,
    slug: product.slug || "",
    price: Number(product.price),
    image: product.image || "",
    sku: product.sku || "",
    item_number: product.item_number || product.itemNumber || "",
    mfr_number: product.mfr_number || product.mfrNumber || "",
    material: product.material || "",
    description: product.description || "",
    in_stock: product.in_stock ?? product.inStock ?? true,
    availability_status: product.availability_status || product.availabilityStatus || "in_stock",
    is_featured: product.is_featured ?? product.isFeatured ?? false,
    sort_order: product.sort_order ?? product.sortOrder ?? 0,
    images: (product.images || []).map((image) => (typeof image === "string" ? image : image.url)).filter(Boolean),
    specs: (product.specs || []).map((spec) => ({
      label: spec.label,
      value: spec.value,
    })),
  };
}
