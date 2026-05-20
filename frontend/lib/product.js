import { getSlug } from "./slug";

export function enrichProduct(product, index, categoryName = "Industrial") {
  const slug = getSlug(product.name);
  const mfrNumber =
    product.mfrNumber ||
    slug
      .replace(/-/g, "")
      .toUpperCase()
      .slice(0, 10);

  return {
    ...product,
    slug,
    description:
      product.description ||
      `${product.name.replace(/®|™/g, "")} for ${categoryName} applications.`,
    mfrNumber,
    itemNumber: product.itemNumber || String(1326180 + index + 1),
    inStock: product.inStock ?? true,
  };
}

export function parsePrice(price) {
  if (typeof price === "number") return price;
  return Number.parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(price) {
  if (typeof price === "string" && price.startsWith("$")) return price;
  return `$${parsePrice(price).toFixed(2)}`;
}
