export const categories = [
  { name: "Conveyor Belts", image: "/images/products/conveyor-belt.png" },
  { name: "Industrial Hose", image: "/images/products/industrial-hose.png" },
  { name: "Hydraulic Hose", image: "/images/products/hydraulic-hose-v2.png" },
  { name: "Hose Fittings &\nAdapters", image: "/images/products/hose-fittings.png" },
  { name: "Rubber & Gaskets", image: "/images/products/oil-seal.png" },
  { name: "Conveyor\nComponents", image: "/images/products/conveyor-components.png" },
  { name: "Bearings", image: "/images/products/bearing.png" },
  { name: "Motors & Control", image: "/images/products/motors-control.png" },
  { name: "Pipe Valves &\nFittings", image: "/images/products/pipe-valves.png" },
  { name: "Adhesives &\nLubricants", image: "/images/products/wd40.png" },
  { name: "Packing & Sealing", image: "/images/products/packing-sealing-v2.png" },
  { name: "Safety Gear &\nSupplies", image: "/images/products/safety-gear-v2.png" },
];

export function getCategoryName(slug) {
  return slug?.replace(/-/g, " ") || "Category";
}
