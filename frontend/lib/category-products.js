import { getSlug } from "./slug";
import { getCategoryName } from "./categories";
import { enrichProduct } from "./product";

export const categoryProducts = {
  "conveyor-belts": [
    { name: "Heavy-Duty Rubber Conveyor Belt", price: "$120.00", image: "/images/products/conveyor-belt.png" },
    { name: "Cleated Incline Conveyor Belt", price: "$150.00", image: "/images/products/conveyor-belt.png" },
    { name: "Heat Resistant Belt", price: "$180.00", image: "/images/products/conveyor-belt.png" },
    { name: "Oil Resistant Belt", price: "$140.00", image: "/images/products/conveyor-belt.png" },
    { name: "Chevron Multi-V Conveyor Belt", price: "$160.00", image: "/images/products/conveyor-belt.png" },
    { name: "FDA Food-Grade Conveyor Belt", price: "$110.00", image: "/images/products/conveyor-belt.png" },
  ],
  "industrial-hose": [
    { name: "General Purpose Water Hose", price: "$45.00", image: "/images/products/industrial-hose.png" },
    { name: "Premium Chemical Transfer Hose", price: "$290.00", image: "/images/products/industrial-hose.png" },
    { name: "Heavy-Duty Air & Multipurpose Hose", price: "$85.00", image: "/images/products/industrial-hose.png" },
    { name: "High-Temp Steam Hose", price: "$140.00", image: "/images/products/industrial-hose.png" },
    { name: "Fuel & Oil Suction Hose", price: "$195.00", image: "/images/products/fuel-hose.png" },
    { name: "Corrugated Metal Hose", price: "$320.00", image: "/images/products/industrial-hose.png" },
  ],
  "hydraulic-hose": [
    { name: "High-Pressure Braided Hydraulic Hose", price: "$98.00", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Spiral Wire Reinforced Hydraulic Hose", price: "$165.00", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Medium Pressure Textile Braided Hose", price: "$60.00", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Low-Pressure Return Line Hose", price: "$40.00", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "Thermoplastic Hydraulic Hose", price: "$115.00", image: "/images/products/hydraulic-hose-v2.png" },
    { name: "High-Temp 2-Wire Hydraulic Hose", price: "$145.00", image: "/images/products/hydraulic-hose-v2.png" },
  ],
  "hose-fittings-and-adapters": [
    { name: "JIC 37-Degree Flare Adapter", price: "$12.50", image: "/images/products/hose-fittings.png" },
    { name: "NPTF Pipe Swivel Elbow", price: "$18.20", image: "/images/products/hose-fittings.png" },
    { name: "SAE O-Ring Boss Fitting", price: "$14.90", image: "/images/products/hose-fittings.png" },
    { name: "Quick Disconnect Hose Coupler", price: "$45.00", image: "/images/products/hose-fittings.png" },
    { name: "Split Flange Hydraulic Fitting", price: "$28.00", image: "/images/products/hose-fittings.png" },
    { name: "Brass Hose Barb Insert", price: "$8.50", image: "/images/products/hose-fittings.png" },
  ],
  "rubber-and-gaskets": [
    { name: "Neoprene Sheet Rubber Gasket", price: "$32.00", image: "/images/products/oil-seal.png" },
    { name: "Red Rubber Flange Gasket", price: "$14.50", image: "/images/products/oil-seal.png" },
    { name: "EPDM High-Temp Gasket Sheet", price: "$48.00", image: "/images/products/oil-seal.png" },
    { name: "Buna-N Nitrile O-Ring Assortment", price: "$22.00", image: "/images/products/oil-seal.png" },
    { name: "Spiral Wound Metal Gasket", price: "$85.00", image: "/images/products/oil-seal.png" },
    { name: "Silicone Sponge Rubber Strip", price: "$18.90", image: "/images/products/oil-seal.png" },
  ],
  "conveyor-components": [
    { name: "CEMA C Steel Conveyor Idler Rollers", price: "$110.00", image: "/images/products/conveyor-components.png" },
    { name: "Self-Cleaning Wing Pulley", price: "$420.00", image: "/images/products/conveyor-components.png" },
    { name: "Conveyor Belt Scraper Blades", price: "$180.00", image: "/images/products/conveyor-components.png" },
    { name: "Lagged Drum Pulley", price: "$350.00", image: "/images/products/conveyor-components.png" },
    { name: "Impact Bed Slider Bar", price: "$75.00", image: "/images/products/conveyor-components.png" },
    { name: "Pneumatic Belt Tensioning Cylinder", price: "$240.00", image: "/images/products/conveyor-components.png" },
  ],
  bearings: [
    { name: "Dodge® Pillow Block Bearing", price: "$79.00", image: "/images/products/bearing.png", brand: "Dodge" },
    { name: "Flange Mount 4-Bolt Ball Bearing", price: "$65.00", image: "/images/products/bearing.png" },
    { name: "Tapered Roller Bearing Assembly", price: "$120.00", image: "/images/products/bearing.png", brand: "Timken" },
    { name: "Split-Housing Spherical Roller Bearing", price: "$340.00", image: "/images/products/bearing.png" },
    { name: "Stainless Steel Take-Up Bearing", price: "$95.00", image: "/images/products/bearing.png" },
    { name: "Bronze Sleeve Bearing Bushing", price: "$12.00", image: "/images/products/bearing.png" },
  ],
  "motors-and-control": [
    { name: "Three-Phase AC Induction Motor 5HP", price: "$380.00", image: "/images/products/motors-control.png" },
    { name: "Variable Frequency Drive (VFD) 230V", price: "$295.00", image: "/images/products/motors-control.png" },
    { name: "Right-Angle Gearmotor Reducer", price: "$460.00", image: "/images/products/motors-control.png" },
    { name: "Washdown Duty NEMA Motor 2HP", price: "$310.00", image: "/images/products/motors-control.png" },
    { name: "Magnetic Motor Starter Controller", price: "$115.00", image: "/images/products/motors-control.png" },
    { name: "Photoelectric Conveyor Sensor Switch", price: "$58.00", image: "/images/products/motors-control.png" },
  ],
  "pipe-valves-and-fittings": [
    { name: "High-Pressure Brass Ball Valve 2\"", price: "$85.00", image: "/images/products/pipe-valves.png" },
    { name: "Cast Iron Butterfly Valve Wafers", price: "$140.00", image: "/images/products/pipe-valves.png" },
    { name: "Forged Steel Gate Valve 600#", price: "$290.00", image: "/images/products/pipe-valves.png" },
    { name: "Stainless Steel Pipe Tee Fitting", price: "$34.00", image: "/images/products/pipe-valves.png" },
    { name: "Sch 80 PVC Pipe Coupling Connector", price: "$7.50", image: "/images/products/pipe-valves.png" },
    { name: "Carbon Steel Threaded Pipe Elbow", price: "$16.80", image: "/images/products/pipe-valves.png" },
  ],
  "adhesives-and-lubricants": [
    { name: "WD40® Specialist Silicone Lubricant", price: "$14.90", image: "/images/products/wd40.png" },
    { name: "Huskey™ Lube-O-Seal PTFE Grease", price: "$24.50", image: "/images/products/huskey.png" },
    { name: "Loctite Threadlocker 242 Medium", price: "$18.50", image: "/images/products/wd40.png" },
    { name: "High-Strength Industrial RTV Silicone", price: "$12.00", image: "/images/products/wd40.png" },
    { name: "Heavy-Duty Anti-Seize Lubricant", price: "$22.00", image: "/images/products/wd40.png" },
    { name: "Cyanoacrylate Instant Adhesive Glue", price: "$9.50", image: "/images/products/wd40.png" },
  ],
  "packing-and-sealing": [
    { name: "Automated Box Packing System", price: "$3400.00", image: "/images/products/packing-sealing-v2.png" },
    { name: "Industrial Box Taping Machine", price: "$1250.00", image: "/images/products/packing-sealing-v2.png" },
    { name: "PTFE Compression Valve Stem Packing", price: "$45.00", image: "/images/products/packing-sealing-v2.png" },
    { name: "Mechanical Pump Shaft Seal Assembly", price: "$180.00", image: "/images/products/packing-sealing-v2.png" },
    { name: "Heavy-Duty Cardboard Shipping Carton", price: "$4.20", image: "/images/products/packing-sealing-v2.png" },
    { name: "Graphite Pump Gland Packing Cord", price: "$60.00", image: "/images/products/packing-sealing-v2.png" },
  ],
  "safety-gear-and-supplies": [
    { name: "Premium ABS Safety Hard Hat Yellow", price: "$24.00", image: "/images/products/safety-gear-v2.png" },
    { name: "Heavy-Duty Split-Cowhide Work Gloves", price: "$14.50", image: "/images/products/safety-gear-v2.png" },
    { name: "Professional Noise-Reduction Ear Muffs", price: "$29.00", image: "/images/products/safety-gear-v2.png" },
    { name: "High-Visibility Class 2 Safety Vest", price: "$12.90", image: "/images/products/safety-gear-v2.png" },
    { name: "Anti-Fog Scratch-Resistant Safety Glasses", price: "$8.50", image: "/images/products/safety-gear-v2.png" },
    { name: "Industrial First Aid Kit Wall-Cabinet", price: "$75.00", image: "/images/products/safety-gear-v2.png" },
  ],
};

const defaultProducts = [
  { name: "Premium Industrial Product 1", price: "$120.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+1" },
  { name: "Premium Industrial Product 2", price: "$150.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+2" },
  { name: "Premium Industrial Product 3", price: "$180.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+3" },
  { name: "Premium Industrial Product 4", price: "$140.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+4" },
  { name: "Premium Industrial Product 5", price: "$160.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+5" },
  { name: "Premium Industrial Product 6", price: "$110.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+6" },
];

export function getProductsForCategory(slug, brandName = null) {
  let products = categoryProducts[slug] || defaultProducts;

  if (brandName) {
    const brandLower = brandName.toLowerCase();
    products = products.filter(
      (product) =>
        product.brand?.toLowerCase() === brandLower ||
        product.name.toLowerCase().includes(brandLower)
    );

    if (products.length === 0) {
      products = (categoryProducts[slug] || defaultProducts).map((product) => ({
        ...product,
        brand: brandName,
      }));
    }
  }

  return products;
}

export function getProductBySlug(slug) {
  for (const [categorySlug, products] of Object.entries(categoryProducts)) {
    const categoryName = getCategoryName(categorySlug);
    const index = products.findIndex((product) => getSlug(product.name) === slug);

    if (index !== -1) {
      return {
        ...enrichProduct(products[index], index, categoryName),
        categorySlug,
        categoryName,
      };
    }
  }

  return null;
}

export function getRelatedProducts(categorySlug, productSlug, limit = 4) {
  const products = getProductsForCategory(categorySlug)
    .map((product, index) => ({
      ...enrichProduct(product, index, getCategoryName(categorySlug)),
      categorySlug,
    }))
    .filter((product) => product.slug !== productSlug);

  return products.slice(0, limit);
}
