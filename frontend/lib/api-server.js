import { mapApiBrand, mapApiCategory, mapApiProduct } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

async function serverFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json();
}

export async function getProductBySlug(slug) {
  const result = await serverFetch(`/products/${slug}`);
  if (!result?.data) return null;
  return mapApiProduct(result.data);
}

export async function getCategoryBySlug(slug) {
  const result = await serverFetch(`/categories/${slug}`);
  if (!result?.data) return null;
  return mapApiCategory(result.data);
}

export async function getTopLevelCategories() {
  const result = await serverFetch("/categories?top_level=1&active=1");
  if (!result?.data) return [];
  return result.data.map(mapApiCategory);
}

export async function getBrandBySlug(slug, params = {}) {
  const result = await serverFetch(`/brands/${slug}${buildQuery(params)}`);
  if (!result?.data) return null;
  return mapApiBrand(result.data);
}

export async function getBrandsForCategory(categorySlug) {
  const result = await serverFetch(`/brands?active=1&category=${categorySlug}`);
  if (!result?.data) return [];
  return result.data.map(mapApiBrand);
}

export async function getProductsForListing({
  categorySlug,
  subcategorySlug,
  brandSlug,
  perPage = 100,
} = {}) {
  const params = { per_page: perPage };
  if (categorySlug) params.category = categorySlug;
  if (subcategorySlug) params.subcategory = subcategorySlug;
  if (brandSlug) params.brand = brandSlug;

  const result = await serverFetch(`/products${buildQuery(params)}`);
  if (!result) return { products: [], meta: { total: 0 } };

  return {
    products: result.data.map(mapApiProduct),
    meta: result.meta || { total: result.data.length },
  };
}
