import { getSlug } from "./slug";

export const MATERIAL_FILTERS = ["Rubber", "PVC", "Synthetic"];

export const PRICE_RANGE_FILTERS = [
  { id: "under-100", label: "Under $100" },
  { id: "100-200", label: "$100 - $200" },
  { id: "over-200", label: "Over $200" },
];

export function inferMaterial(product) {
  const text = `${product.name} ${product.description || ""}`.toLowerCase();

  if (text.includes("pvc")) return "PVC";
  if (/rubber|epdm|neoprene|buna|silicone|gasket|belt|hose/.test(text) && !text.includes("pvc")) {
    return "Rubber";
  }

  return "Synthetic";
}

export function matchesPriceRange(price, rangeId) {
  const value = parsePrice(price);

  if (rangeId === "under-100") return value < 100;
  if (rangeId === "100-200") return value >= 100 && value <= 200;
  if (rangeId === "over-200") return value > 200;

  return true;
}

export function enrichProduct(product, index, categoryName = "Industrial") {
  const mfrNumber =
    product.mfrNumber ||
    (product.slug || getSlug(product.name))
      .replace(/-/g, "")
      .toUpperCase()
      .slice(0, 10);

  return {
    ...product,
    slug: product.slug || getSlug(product.name),
    description:
      product.description ||
      `${product.name.replace(/®|™/g, "")} for ${categoryName} applications.`,
    mfrNumber,
    itemNumber: product.itemNumber || String(1326180 + index + 1),
    inStock: product.inStock ?? true,
    material: product.material || inferMaterial(product),
  };
}

export function parsePrice(price) {
  if (typeof price === "number") return price;
  return Number.parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(price) {
  if (typeof price === "string" && price.startsWith("$")) return price;
  const value = parsePrice(price);
  if (value === 0) return "Quote";
  return `$${value.toFixed(2)}`;
}

export function getProductSku(product) {
  const suffix = product.slug.split("-").slice(0, 2).join("-").toUpperCase().slice(0, 8);
  return `HOFF-${product.itemNumber}-${suffix || "SKU"}`;
}

export function getTechnicalSpecs(product) {
  const materialValues = {
    Rubber: "Reinforced Synthetic Rubber",
    PVC: "Industrial PVC Compound",
    Synthetic: "High-Grade Synthetic Polymer",
  };

  return [
    { label: "Material", value: materialValues[product.material] || "Industrial Grade" },
    { label: "Tensile Strength", value: "3500 PSI" },
    { label: "Max Temperature", value: "250°F (121°C)" },
    { label: "Industry Standards", value: "ISO 9001, ASTM-D" },
    { label: "Country of Origin", value: "USA" },
    { label: "Weight Per Foot", value: "2.4 lbs" },
  ];
}
