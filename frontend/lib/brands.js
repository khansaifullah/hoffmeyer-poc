import { getSlug } from "./slug";

export const brands = [
  { name: "SKF", logo: "/images/brands/skf.svg" },
  { name: "DODGE", logo: "/images/brands/dodge.svg" },
  { name: "TIMKEN", logo: "/images/brands/timken.svg" },
  { name: "NSK", logo: "/images/brands/nsk.svg" },
  { name: "SEALMASTER", logo: "/images/brands/sealmaster.svg" },
  { name: "SCHAEFFLER", logo: "/images/brands/schaeffler.svg" },
  { name: "NTN", logo: "/images/brands/ntn.svg" },
  { name: "Link-Belt", logo: "/images/brands/link-belt.svg" },
  { name: "Continental", logo: "/images/brands/continental.svg" },
  { name: "Parker", logo: "/images/brands/parker.svg" },
  { name: "CARLISLE", logo: "/images/brands/carlisle.svg" },
  { name: "Martin", logo: "/images/brands/martin.svg" },
  { name: "FALK", logo: "/images/brands/falk.svg" },
  { name: "REXNORD", logo: "/images/brands/rexnord.svg" },
  { name: "TSUBAKI", logo: "/images/brands/tsubaki.svg" },
];

const brandDescriptions = {
  dodge:
    "For more than 140 years, Dodge has supplied the industrial market with trusted bearing, gearing, and power transmission solutions built for demanding applications.",
  skf: "SKF is a global supplier of bearings, seals, lubrication systems, and services for industrial and automotive markets.",
  timken: "Timken engineers and manufactures bearings and power transmission components for some of the world's most demanding operations.",
};

export function getBrandBySlug(brandSlug) {
  const brand = brands.find((item) => getSlug(item.name) === brandSlug);
  if (!brand) return null;
  return {
    ...brand,
    slug: brandSlug,
    description: brandDescriptions[brandSlug] || `${brand.name} industrial products supplied through Hoffmeyer for B2B procurement and replacement programs.`,
  };
}

export function getBrandsByNames(names) {
  return names
    .map((name) => brands.find((brand) => brand.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);
}

export const defaultBrandNames = ["SKF", "DODGE", "TIMKEN", "NSK", "Parker", "Continental", "CARLISLE", "Martin"];
