import { categories, getCategoryName } from "./categories";
import { getSlug } from "./slug";

const subcategoryMap = {
  bearings: [
    { name: "Ball Bearings", image: "/images/products/bearing.png" },
    { name: "Cam Followers and Yoke Rollers", image: "/images/products/bearing.png" },
    { name: "Insert Bearings and Cartridge Units", image: "/images/products/bearing.png" },
    { name: "Mounted Bearings", image: "/images/products/bearing.png" },
    { name: "Plain Bearings", image: "/images/products/bearing.png" },
    { name: "Rod Ends and Spherical Plain Bearings", image: "/images/products/bearing.png" },
    { name: "Roller Bearings", image: "/images/products/bearing.png" },
    { name: "Slewing Rings and Turntables", image: "/images/products/bearing.png" },
    { name: "Thrust Bearings", image: "/images/products/bearing.png" },
    { name: "Accessories", image: "/images/products/bearing.png" },
  ],
  "conveyor-belts": [
    { name: "Heavy-Duty Rubber Belts", image: "/images/products/conveyor-belt.png" },
    { name: "Cleated & Incline Belts", image: "/images/products/conveyor-belt.png" },
    { name: "Heat Resistant Belts", image: "/images/products/conveyor-belt.png" },
    { name: "Oil Resistant Belts", image: "/images/products/conveyor-belt.png" },
    { name: "Food-Grade Belts", image: "/images/products/conveyor-belt.png" },
    { name: "Replacement Belting", image: "/images/products/conveyor-belt.png" },
  ],
  "industrial-hose": [
    { name: "Water & Air Hose", image: "/images/products/industrial-hose.png" },
    { name: "Chemical Transfer Hose", image: "/images/products/industrial-hose.png" },
    { name: "Steam & High-Temp Hose", image: "/images/products/industrial-hose.png" },
    { name: "Fuel & Oil Hose", image: "/images/products/fuel-hose.png" },
    { name: "Material Handling Hose", image: "/images/products/industrial-hose.png" },
    { name: "Hose Accessories", image: "/images/products/industrial-hose.png" },
  ],
  "hydraulic-hose": [
    { name: "Braided Hydraulic Hose", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Spiral Wire Hose", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Return Line Hose", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Thermoplastic Hose", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "High-Temp Hydraulic Hose", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Hydraulic Hose Kits", image: "/images/products/hydraulic-hose-v2.png" },
  ],
};

const brandMap = {
  bearings: ["SKF", "DODGE", "TIMKEN", "NSK", "SEALMASTER", "SCHAEFFLER", "NTN", "Link-Belt"],
  "conveyor-belts": ["Continental", "CARLISLE", "Link-Belt", "Martin", "DODGE", "REXNORD", "TSUBAKI", "FALK"],
  "industrial-hose": ["Parker", "Continental", "CARLISLE", "NSK"],
  "hydraulic-hose": ["Parker", "Continental", "CARLISLE", "DODGE"],
  "hose-fittings-and-adapters": ["Parker", "DODGE", "Continental", "CARLISLE"],
};

export function getCategoryImage(slug) {
  const match = categories.find((cat) => getSlug(cat.name) === slug);
  return match?.image || "/images/products/bearing.png";
}

export function getSubcategories(slug, fallbackImage) {
  const image = fallbackImage || getCategoryImage(slug);
  if (subcategoryMap[slug]) return subcategoryMap[slug];

  const label = getCategoryName(slug);
  return [
    { name: `Standard ${label}`, image },
    { name: `Heavy-Duty ${label}`, image },
    { name: `Industrial ${label}`, image },
    { name: `Replacement ${label}`, image },
    { name: `${label} Accessories`, image },
    { name: `${label} Kits`, image },
  ];
}

export function getCategoryBrandNames(slug) {
  return brandMap[slug] || brandMap.bearings;
}

export function getCategoryLabel(slug) {
  return getCategoryName(slug).toUpperCase();
}

export function getSubcategoryName(categorySlug, subSlug) {
  const match = getSubcategories(categorySlug).find(
    (item) => getSlug(item.name) === subSlug
  );
  return match?.name || subSlug.replace(/-/g, " ");
}

export function getSubcategoryHref(categorySlug, subSlug, brandSlug = null) {
  const base = `/category/${categorySlug}/${subSlug}`;
  return brandSlug ? `${base}?brand=${brandSlug}` : base;
}
