import React from "react";
import Link from "next/link";

const categories = [
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

const getSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const ShopByCategory = () => {
  return (
    <section id="categories" className="bg-[#fcfcfc] py-12 md:py-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#004b87] text-center mb-8 md:mb-12">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:px-14">
          {categories.map((cat, index) => (
            <Link 
              href={`/category/${getSlug(cat.name)}`}
              key={index} 
              className="group aspect-square border border-gray-200 rounded-2xl md:rounded-xl p-4 flex flex-col items-center justify-between hover:shadow-lg hover:border-[#16568D] transition-all duration-300 overflow-hidden cursor-pointer bg-white"
            >
              <div className="flex-1 w-full flex items-center justify-center min-h-0 p-2">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <p className="text-[14px] md:text-[13px] font-semibold md:font-bold text-center text-gray-800 group-hover:text-[#16568D] transition-colors duration-200 leading-tight h-[40px] md:h-[36px] flex items-center justify-center whitespace-pre-wrap">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center">
          <button className="bg-[#16568D] md:bg-white text-white md:text-[#16568D] md:border md:border-[#16568D] px-6 md:px-8 py-3.5 md:py-2.5 rounded-lg md:rounded-md font-semibold md:font-bold text-[18px] md:text-[15px] shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
