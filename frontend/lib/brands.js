import { getSlug } from "./slug";

export const brands = [
  {
    name: "SKF",
    render: () => (
      <svg viewBox="0 0 160 50" className="h-full max-h-10 w-full">
        <path d="M15,12 L38,12 L38,18 L21,18 L21,22 L38,22 L38,38 L15,38 L15,32 L32,32 L32,28 L15,28 Z" fill="#003366" />
        <path d="M45,12 L52,12 L52,22 L65,12 L75,12 L60,24 L76,38 L65,38 L52,27 L52,38 L45,38 Z" fill="#003366" />
        <path d="M83,12 L108,12 L108,18 L91,18 L91,22 L105,22 L105,28 L91,28 L91,38 L83,38 Z" fill="#003366" />
      </svg>
    ),
  },
  {
    name: "DODGE",
    render: () => (
      <svg viewBox="0 0 160 50" className="h-full max-h-10 w-full">
        <path d="M80,8 L94,22 L80,36 L66,22 Z" fill="#5A949E" />
        <text x="50%" y="65%" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="24" fill="#1C3D43" letterSpacing="0.08em">DODGE</text>
      </svg>
    ),
  },
  {
    name: "TIMKEN",
    render: () => (
      <span className="text-[22px] font-black tracking-tight text-[#003087] md:text-[26px]">TIMKEN</span>
    ),
  },
  {
    name: "NSK",
    render: () => (
      <span className="text-[24px] font-black tracking-tight text-[#C8102E] md:text-[28px]">NSK</span>
    ),
  },
  {
    name: "SEALMASTER",
    render: () => (
      <span className="text-center text-[13px] font-black uppercase leading-tight tracking-wide text-[#003366] md:text-[15px]">
        SEAL<br />MASTER
      </span>
    ),
  },
  {
    name: "SCHAEFFLER",
    render: () => (
      <span className="text-[14px] font-bold uppercase tracking-wide text-[#00893D] md:text-[16px]">Schaeffler</span>
    ),
  },
  {
    name: "NTN",
    render: () => (
      <span className="text-[24px] font-black text-[#005BAC] md:text-[28px]">NTN</span>
    ),
  },
  {
    name: "Link-Belt",
    render: () => (
      <span className="text-[18px] font-black text-[#003366] md:text-[22px]">Link-Belt</span>
    ),
  },
  {
    name: "Continental",
    render: () => (
      <svg viewBox="0 0 160 50" className="h-full max-h-10 w-full">
        <circle cx="20" cy="18" r="8" fill="#FFA500" />
        <text x="32" y="22" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15" fill="#FFA500">Continental</text>
      </svg>
    ),
  },
  {
    name: "Parker",
    render: () => (
      <svg viewBox="0 0 160 50" className="h-full max-h-10 w-full">
        <rect x="20" y="12" width="120" height="26" fill="#000000" />
        <text x="94" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="20" fill="#FFFFFF">arker</text>
      </svg>
    ),
  },
  {
    name: "CARLISLE",
    render: () => (
      <svg viewBox="0 0 160 50" className="h-full max-h-10 w-full">
        <path d="M12,12 L148,12 L140,38 L4,38 Z" fill="#003E94" />
        <text x="50%" y="65%" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" fill="#FFFFFF">CARLISLE</text>
      </svg>
    ),
  },
  {
    name: "Martin",
    render: () => (
      <span className="text-[26px] font-bold italic text-[#0072CE]">Martin</span>
    ),
  },
  {
    name: "FALK",
    render: () => (
      <span className="text-[26px] font-black text-[#0072CE]">FALK</span>
    ),
  },
  {
    name: "REXNORD",
    render: () => (
      <span className="text-[20px] font-black text-[#111]">REXNORD</span>
    ),
  },
  {
    name: "TSUBAKI",
    render: () => (
      <span className="text-[18px] font-black italic text-[#0096DF]">TSUBAKI</span>
    ),
  },
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
