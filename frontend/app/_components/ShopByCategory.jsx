"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { categories as defaultCategories } from "@/lib/categories";
import {
  cardHoverMotion,
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { getSlug } from "@/lib/slug";
import { buttonRadius, squareCardRadius } from "@/lib/ui-presets";

export default function ShopByCategory({
  title = "Shop by Category",
  categories = defaultCategories,
  currentSlug = null,
  showViewAll = true,
}) {
  return (
    <section id="categories" className="scroll-mt-28 bg-[#fcfcfc] px-4 py-12 md:scroll-mt-36 md:px-0 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={fadeUpVariant}
          transition={fadeUpTransition}
          className="mb-8 text-center text-[26px] font-bold text-[#004b87] md:mb-12 md:text-[32px]"
        >
          {title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={staggerContainerVariant}
          className="grid grid-cols-2 gap-4 md:grid-cols-6 md:px-14"
        >
          {categories.map((cat, index) => {
            const slug = getSlug(cat.name);
            const isActive = currentSlug === slug;

            return (
              <motion.div key={index} variants={fadeUpVariant} whileHover={cardHoverMotion}>
                <Link
                  href={`/category/${slug}`}
                  className={`group flex aspect-square cursor-pointer flex-col items-center justify-between overflow-hidden ${squareCardRadius} border p-4 transition-all duration-300 ${
                    isActive
                      ? "border-[#16568D] bg-[#16568D]/5 shadow-lg"
                      : "border-gray-200 bg-white hover:border-[#16568D] hover:shadow-lg"
                  }`}
                >
                  <div className="flex min-h-0 w-full flex-1 items-center justify-center p-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p
                    className={`flex h-[40px] items-center justify-center whitespace-pre-wrap text-center text-[14px] font-semibold leading-tight transition-colors duration-200 md:h-[36px] md:text-[13px] md:font-bold ${
                      isActive ? "text-[#16568D]" : "text-gray-800 group-hover:text-[#16568D]"
                    }`}
                  >
                    {cat.name}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {showViewAll && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={fadeUpVariant}
            transition={{ ...fadeUpTransition, delay: 0.15 }}
            className="mt-8 flex justify-center md:mt-12"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#categories"
                className={`${buttonRadius} border border-[#16568D] bg-white px-6 py-3.5 text-[18px] font-semibold text-[#16568D] shadow-sm transition-colors hover:bg-[#16568D] hover:text-white active:scale-[0.98] md:px-8 md:py-2.5 md:text-[15px] md:font-bold`}
              >
                View All Categories
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
