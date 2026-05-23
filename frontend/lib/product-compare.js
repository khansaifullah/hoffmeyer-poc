const STORAGE_KEY = "hoffmeyer_compare";
export const MAX_COMPARE_PRODUCTS = 4;

function readSlugs() {
  if (typeof window === "undefined") return [];

  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeSlugs(slugs) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent("hoffmeyer-compare-change", { detail: slugs }));
}

export function getCompareSlugs() {
  return readSlugs();
}

export function setCompareSlugs(slugs) {
  const unique = [...new Set(slugs)].slice(0, MAX_COMPARE_PRODUCTS);
  writeSlugs(unique);
  return unique;
}

export function addCompareSlug(slug) {
  const current = readSlugs();
  if (current.includes(slug)) return current;
  if (current.length >= MAX_COMPARE_PRODUCTS) return current;

  return setCompareSlugs([...current, slug]);
}

export function removeCompareSlug(slug) {
  return setCompareSlugs(readSlugs().filter((item) => item !== slug));
}

export function clearCompareSlugs() {
  writeSlugs([]);
  return [];
}

export function getCompareHref(slugs = readSlugs()) {
  if (!slugs.length) return "/compare";
  return `/compare?slugs=${slugs.join(",")}`;
}
