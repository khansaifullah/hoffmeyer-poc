import { cache } from "react";
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

async function serverFetch(path, options = {}, attempt = 0) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    if (attempt < 1) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return serverFetch(path, options, attempt + 1);
    }

    throw error;
  }
}

export const getProductBySlug = cache(async (slug) => {
  const result = await serverFetch(`/products/${slug}`);
  if (!result?.data) return null;
  return mapApiProduct(result.data);
});

export const getCategoryBySlug = cache(async (slug) => {
  const result = await serverFetch(`/categories/${slug}`);
  if (!result?.data) return null;
  return mapApiCategory(result.data);
});

export async function getTopLevelCategories() {
  const result = await serverFetch("/categories?product_groups=1&active=1");
  if (!result?.data) return [];
  return result.data.map((category) => mapApiCategory(category));
}

export async function getCategoryTree() {
  const result = await serverFetch("/categories?tree=1&active=1");
  if (!result?.data) return [];
  return result.data.map((category) => mapApiCategory(category));
}

const LANDING_CATEGORY_LIMIT = 4;

export const LANDING_PRODUCT_GROUP_SLUGS = [
  "conveyor-solutions",
  "flow-control-and-instrumentation",
  "safety-gear-and-supplies",
];

export async function getLandingProductGroups() {
  const tree = await getCategoryTree();
  const treeBySlug = new Map(tree.map((group) => [group.slug, group]));

  return LANDING_PRODUCT_GROUP_SLUGS.map((slug) => treeBySlug.get(slug))
    .filter(Boolean)
    .map((group) => enrichGroupPreview(group));
}

export async function getCatalogProductGroups() {
  return getCategoryTree();
}

function enrichGroupPreview(group) {
  return {
    ...group,
    categories: (group.children || []).slice(0, LANDING_CATEGORY_LIMIT),
  };
}

export const getBrandBySlug = cache(async (slug, params = {}) => {
  const result = await serverFetch(`/brands/${slug}${buildQuery(params)}`);
  if (!result?.data) return null;
  return mapApiBrand(result.data);
});

export const getBrandsForCategory = cache(async (categorySlug) => {
  const result = await serverFetch(`/brands?active=1&category=${categorySlug}`);
  if (!result?.data) return [];
  return result.data.map(mapApiBrand);
});

export const getProductsForListing = cache(async ({
  productGroup,
  categorySlug,
  subcategorySlug,
  brandSlug,
  perPage = 100,
} = {}) => {
  const params = { per_page: perPage };
  if (productGroup) params.product_group = productGroup;
  if (categorySlug) params.category = categorySlug;
  if (subcategorySlug) params.subcategory = subcategorySlug;
  if (brandSlug) params.brand = brandSlug;

  const result = await serverFetch(`/products${buildQuery(params)}`);
  if (!result) return { products: [], meta: { total: 0 } };

  return {
    products: result.data.map(mapApiProduct),
    meta: result.meta || { total: result.data.length },
  };
});
