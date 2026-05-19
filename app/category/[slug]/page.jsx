"use client";
import React, { useState, use } from "react";
import Header from "../../_components/Header";
import Newsletter from "../../_components/Newsletter";
import Link from "next/link";

const getSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/®/g, "")
    .replace(/™/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const categoryProducts = {
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
  "bearings": [
    { name: "Dodge® Pillow Block Bearing", price: "$79.00", image: "/images/products/bearing.png" },
    { name: "Flange Mount 4-Bolt Ball Bearing", price: "$65.00", image: "/images/products/bearing.png" },
    { name: "Tapered Roller Bearing Assembly", price: "$120.00", image: "/images/products/bearing.png" },
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
  ]
};

const CategoryDetail = ({ params }) => {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const categoryName = slug?.replace(/-/g, " ") || "Category";

  const products = categoryProducts[slug] || [
    { name: "Premium Industrial Product 1", price: "$120.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+1" },
    { name: "Premium Industrial Product 2", price: "$150.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+2" },
    { name: "Premium Industrial Product 3", price: "$180.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+3" },
    { name: "Premium Industrial Product 4", price: "$140.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+4" },
    { name: "Premium Industrial Product 5", price: "$160.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+5" },
    { name: "Premium Industrial Product 6", price: "$110.00", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Product+6" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      
      {/* Category Header */}
      <div className="bg-[#f2f2f2] py-8 md:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <nav className="flex text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">
            <a href="/" className="hover:text-[#004b87]">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#004b87]">Categories</span>
          </nav>
          <h1 className="text-[28px] md:text-[42px] font-extrabold text-[#004b87] capitalize leading-tight">
            {categoryName}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl text-[16px] md:text-[18px]">
            High-performance {categoryName} solutions designed for maximum durability and efficiency in industrial applications.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <h3 className="text-[18px] font-bold text-[#333] mb-6 border-b pb-2">Filter By</h3>
            
            <div className="mb-8">
              <h4 className="font-bold text-[14px] uppercase tracking-wide text-gray-400 mb-4">Material</h4>
              <div className="flex flex-col gap-3 text-[15px] text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Rubber</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> PVC</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Synthetic</label>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-[14px] uppercase tracking-wide text-gray-400 mb-4">Price Range</h4>
              <div className="flex flex-col gap-3 text-[15px] text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Under $100</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> $100 - $200</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Over $200</label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <span className="text-gray-500 font-medium">{products.length} Products Found</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMobileFilters(!showMobileFilters)} 
                  className="md:hidden flex items-center gap-2 border border-gray-200 rounded-md py-1.5 px-3.5 text-[14px] font-bold text-[#333] outline-none bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Filters
                </button>
                <select className="border border-gray-200 rounded-md py-1.5 px-3 text-[14px] font-bold text-[#333] outline-none">
                  <option>Sort By: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Accordion */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${showMobileFilters ? "max-h-[300px] mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100" : "max-h-0"}`}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[13px] uppercase tracking-wide text-gray-400 mb-3">Material</h4>
                  <div className="flex flex-col gap-2.5 text-[14px] text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Rubber</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> PVC</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Synthetic</label>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[13px] uppercase tracking-wide text-gray-400 mb-3">Price Range</h4>
                  <div className="flex flex-col gap-2.5 text-[14px] text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Under $100</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> $100 - $200</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Over $200</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <Link 
                  href={`/product/${getSlug(product.name)}`}
                  key={index} 
                  className="group cursor-pointer block"
                >
                  <div className="aspect-square bg-[#f8f8f8] border border-gray-100 rounded-2xl overflow-hidden relative mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute bottom-4 left-4 right-4 bg-white text-[#004b87] py-2.5 rounded-lg font-bold text-[13px] opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      View Detail
                    </button>
                  </div>
                  <h3 className="font-bold text-[#333] text-[16px] mb-1 group-hover:text-[#004b87] transition-colors">{product.name}</h3>
                  <p className="text-[#004b87] font-extrabold text-[15px]">{product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </main>
  );
};

export default CategoryDetail;
