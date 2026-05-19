import React from "react";
import Link from "next/link";

const products = [
  { name: "Heavy-Duty Belt", image: "https://placehold.co/400x400/f8f8f8/004b87?text=Belt" },
  { name: "Dodge® Pillow Block Bearings", image: "/images/products/bearing.png" },
  { name: "WD40® Silicone Lubricant", image: "/images/products/wd40.png" },
  { name: "Huskey™ Lube-O-Seal", image: "/images/products/huskey.png" },
  { name: "Oil Seals", image: "/images/products/oil-seal.png" },
  { name: "Fuel Transfer Hose", image: "/images/products/fuel-hose.png" },
];

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

const TopProducts = () => {
  return (
    <section className="bg-white py-7 md:py-16 px-14 md:px-0">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h2 className="text-[24px] md:text-[32px] font-bold text-[#004b87] text-center mb-6 md:mb-10">
          Our Top Selling Products
        </h2>
        
        <div className="relative w-full md:px-14">
          {/* Left Arrow (Desktop Only) */}
          <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-[#16568D] rounded-md items-center justify-center text-[#16568D] hover:bg-[#16568D] hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {products.map((product, index) => (
              <Link 
                href={`/product/${getSlug(product.name)}`}
                key={index} 
                className="group aspect-square border border-gray-200 md:rounded-xl rounded-2xl p-4 md:p-3 flex flex-col items-center justify-between hover:shadow-lg hover:border-[#16568D] transition-all duration-300 overflow-hidden cursor-pointer bg-white"
              >
                <div className="flex-1 w-full flex items-center justify-center min-h-0 p-2">
                  <img src={product.image} alt={product.name} className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>
                <p className="text-[14px] md:text-[13px] font-semibold md:font-bold text-center text-gray-800 group-hover:text-[#16568D] transition-colors duration-200 leading-tight h-[40px] md:h-[36px] flex items-center justify-center">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Right Arrow (Desktop Only) */}
          <button className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-[#16568D] rounded-md items-center justify-center text-[#16568D] hover:bg-[#16568D] hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
