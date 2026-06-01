export const categories = [
  { name: "Conveyor Belts", image: "/images/products/conveyor-belt.png", groupSlug: "conveyor-solutions" },
  { name: "Industrial Hose", image: "/images/products/industrial-hose.png", groupSlug: "hose-and-fittings" },
  { name: "Hydraulic Hose", image: "/images/products/hydraulic-hose-v2.png", groupSlug: "hose-and-fittings" },
  { name: "Hose Fittings &\nAdapters", image: "/images/products/hose-fittings.png", groupSlug: "hose-and-fittings" },
  { name: "Rubber & Gaskets", image: "/images/products/oil-seal.png", groupSlug: "rubber-gaskets-and-seals" },
  { name: "Conveyor\nComponents", image: "/images/products/conveyor-components.png", groupSlug: "conveyor-solutions" },
  { name: "Bearings", image: "/images/products/bearing.png", groupSlug: "bearings" },
  { name: "Motors & Control", image: "/images/products/motors-control.png", groupSlug: "electric-motors" },
  { name: "Pipe Valves &\nFittings", image: "/images/products/pipe-valves.png", groupSlug: "pipe-valves-and-fittings" },
  { name: "Adhesives &\nLubricants", image: "/images/products/wd40.png", groupSlug: "adhesives-lubricants-and-chemicals" },
  { name: "Packing & Sealing", image: "/images/products/packing-sealing-v2.png", groupSlug: "flow-control-and-instrumentation" },
  { name: "Safety Gear &\nSupplies", image: "/images/products/safety-gear-v2.png", groupSlug: "safety-gear-and-supplies" },
];

export function getCategoryName(slug) {
  return slug?.replace(/-/g, " ") || "Category";
}
