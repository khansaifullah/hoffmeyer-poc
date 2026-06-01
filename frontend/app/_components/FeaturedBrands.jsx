"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import BrandLogo from "./BrandLogo";
import { defaultBrandNames, getBrandsByNames } from "@/lib/brands";
import {
  cardHoverMotion,
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { getSlug } from "@/lib/slug";
import { getBrandInGroupHref, getProductGroupHref } from "@/lib/catalog-urls";
import { cardRadius, buttonRadius } from "@/lib/ui-presets";

export default function FeaturedBrands({
  title = null,
  titleAccent = "Featured",
  titleRest = "Brands",
  categorySlug = "bearings",
  showViewAll = true,
}) {
  const featuredBrands = getBrandsByNames(defaultBrandNames);
  const heading = title || `${titleAccent}${titleRest.startsWith(" ") ? titleRest : ` ${titleRest}`}`;

  return (
    <section className="bg-[#f2f2f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={fadeUpVariant}
          transition={fadeUpTransition}
        >
          {title ? (
            <h2 className="mb-8 text-center text-[24px] font-bold text-[#004b87] md:mb-10 md:text-[32px]">
              {heading}
            </h2>
          ) : (
            <SectionHeading accent={titleAccent} rest={titleRest} />
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={staggerContainerVariant}
          className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {featuredBrands.map((brand) => (
            <motion.div key={brand.name} variants={fadeUpVariant} whileHover={cardHoverMotion}>
              <Link
                href={getBrandInGroupHref(categorySlug, getSlug(brand.name))}
                className={`flex h-24 items-center justify-center ${cardRadius} border border-gray-200 bg-white px-4 transition-colors hover:border-[#16568D] md:h-28`}
              >
                <BrandLogo brand={brand} size="lg" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {showViewAll && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={fadeUpVariant}
            transition={{ ...fadeUpTransition, delay: 0.12 }}
            className="mt-8 flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={getProductGroupHref(categorySlug)}
                className={`border border-[#16568D] bg-white px-8 py-2.5 ${buttonRadius} text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white`}
              >
                View All Brands
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { getBrandsByNames };
