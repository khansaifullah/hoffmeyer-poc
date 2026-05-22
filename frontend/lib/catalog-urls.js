export function getSubcategoryHref(categorySlug, subSlug, brandSlug = null) {
  const base = `/category/${categorySlug}/${subSlug}`;
  return brandSlug ? `${base}?brand=${brandSlug}` : base;
}
