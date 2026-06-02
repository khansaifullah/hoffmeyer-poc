export const LISTING_PAGE_SIZE = 24;

export function buildListingQueryParams({
  productGroup,
  categorySlug,
  subcategorySlug,
  brandSlug,
  page,
  perPage = LISTING_PAGE_SIZE,
} = {}) {
  const params = { per_page: perPage };

  if (productGroup) params.product_group = productGroup;
  if (categorySlug) params.category = categorySlug;
  if (subcategorySlug) params.subcategory = subcategorySlug;
  if (brandSlug) params.brand = brandSlug;
  if (page) params.page = page;

  return params;
}
