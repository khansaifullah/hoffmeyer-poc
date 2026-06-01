"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { getCatalogHref } from "@/lib/catalog-urls";
import { buttonRadius } from "@/lib/ui-presets";
import ProductGroupOverviewCard from "./ProductGroupOverviewCard";

export default function FeaturedProductGroups({ groups = [], title = "Explore Our Product Lines" }) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="scroll-mt-28 bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-14 md:scroll-mt-36 md:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={fadeUpVariant}
          transition={fadeUpTransition}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[#16568D]">Product Groups</p>
          <h2 className="text-[28px] font-bold leading-tight text-[#004b87] md:text-[36px]">{title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5b6775] md:text-[16px]">
            Start with our core industrial lines, then drill into categories built for procurement, maintenance, and
            replacement programs.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={staggerContainerVariant}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
        >
          {groups.map((group) => (
            <ProductGroupOverviewCard key={group.slug} group={group} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={fadeUpVariant}
          transition={{ ...fadeUpTransition, delay: 0.12 }}
          className="mt-10 flex justify-center md:mt-14"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={getCatalogHref()}
              className={`${buttonRadius} border border-[#16568D] bg-white px-7 py-3.5 text-[16px] font-semibold text-[#16568D] shadow-sm transition-colors hover:bg-[#16568D] hover:text-white md:text-[15px]`}
            >
              Browse Full Catalog
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
