"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  cardHoverMotion,
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { getSlug } from "@/lib/slug";
import { squareCardRadius } from "@/lib/ui-presets";

const defaultProducts = [
  { name: "Heavy-Duty Rubber Conveyor Belt", image: "/images/products/conveyor-belt.png", category: "conveyor-belts" },
  { name: "Dodge® Pillow Block Bearing", image: "/images/products/bearing.png", category: "bearings" },
  { name: "WD40® Specialist Silicone Lubricant", image: "/images/products/wd40.png", category: "adhesives-and-lubricants" },
  { name: "Huskey™ Lube-O-Seal PTFE Grease", image: "/images/products/huskey.png", category: "adhesives-and-lubricants" },
  { name: "Neoprene Sheet Rubber Gasket", image: "/images/products/oil-seal.png", category: "rubber-and-gaskets" },
  { name: "Fuel & Oil Suction Hose", image: "/images/products/fuel-hose.png", category: "industrial-hose" },
];

export default function FeaturedProducts({
  title = "Featured Products",
  products = defaultProducts,
  linkHref = null,
}) {
  return (
    <section className="bg-white px-4 py-7 md:px-0 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={fadeUpVariant}
          transition={fadeUpTransition}
          className="mb-6 text-center text-[24px] font-bold text-[#004b87] md:mb-10 md:text-[32px]"
        >
          {title}
        </motion.h2>

        <div className="relative w-full md:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4"
          >
            {products.slice(0, 6).map((product, index) => {
              const href = linkHref || `/product/${getSlug(product.name)}`;

              return (
                <motion.div key={index} variants={fadeUpVariant} whileHover={cardHoverMotion}>
                  <Link
                    href={href}
                    className={`group flex aspect-square cursor-pointer flex-col items-center justify-between overflow-hidden ${squareCardRadius} border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#16568D] hover:shadow-lg md:p-3`}
                  >
                    <div className="flex min-h-0 w-full flex-1 items-center justify-center p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="flex h-[40px] items-center justify-center text-center text-[14px] font-semibold leading-tight text-gray-800 transition-colors duration-200 group-hover:text-[#16568D] md:h-[36px] md:text-[13px] md:font-bold">
                      {product.name}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
