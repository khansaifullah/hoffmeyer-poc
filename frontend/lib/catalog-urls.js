export function getCatalogHref() {
  return "/catalog";
}

export function getCategoryHref(category) {
  if (!category) return getCatalogHref();

  if (category.href) {
    return category.href;
  }

  if (category.catalogPath) {
    return `/category/${category.catalogPath}`;
  }

  if (category.breadcrumb?.length) {
    return `/category/${category.breadcrumb.map((node) => node.slug).join("/")}`;
  }

  if (category.level === "product_group" || !category.parentId) {
    return getProductGroupHref(category.slug);
  }

  return getCatalogHref();
}

export function categoryMatchesPath(category, ...segments) {
  if (!category) return false;

  const expectedPath = segments.filter(Boolean).join("/");

  if (category.catalogPath) {
    return category.catalogPath === expectedPath;
  }

  if (category.breadcrumb?.length) {
    return category.breadcrumb.map((node) => node.slug).join("/") === expectedPath;
  }

  return category.level === "product_group" && segments.length === 1 && category.slug === segments[0];
}

export function getProductGroupSlug(category) {
  if (!category) return null;

  if (category.breadcrumb?.length) {
    return category.breadcrumb[0]?.slug || null;
  }

  if (category.level === "product_group" || !category.parentId) {
    return category.slug;
  }

  return null;
}

export function getProductGroupHref(groupSlug) {
  if (!groupSlug) return getCatalogHref();
  return `/category/${groupSlug}`;
}

export function getMidCategoryHref(groupSlug, categorySlug) {
  return `/category/${groupSlug}/${categorySlug}`;
}

export function getSubcategoryHref(groupSlug, categorySlug, subSlug, brandSlug = null) {
  const base = `/category/${groupSlug}/${categorySlug}/${subSlug}`;
  return appendBrandQuery(base, brandSlug);
}

export function getBrandInGroupHref(groupSlug, brandSlug) {
  if (!groupSlug || !brandSlug) return getCatalogHref();
  return `/category/${groupSlug}/brand/${brandSlug}`;
}

export function appendBrandQuery(href, brandSlug) {
  if (!brandSlug) return href;
  return `${href}${href.includes("?") ? "&" : "?"}brand=${brandSlug}`;
}

/** @deprecated Use getMidCategoryHref or getSubcategoryHref with the 3-level taxonomy. */
export function getLegacySubcategoryHref(categorySlug, subSlug, brandSlug = null) {
  const base = `/category/${categorySlug}/${subSlug}`;
  return appendBrandQuery(base, brandSlug);
}
