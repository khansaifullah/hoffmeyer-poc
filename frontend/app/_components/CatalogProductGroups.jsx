"use client";

import { motion } from "motion/react";
import { fadeUpVariant, inViewViewport, staggerContainerVariant } from "@/lib/motion-presets";
import ProductGroupOverviewCard from "./ProductGroupOverviewCard";

export default function CatalogProductGroups({ groups = [] }) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={staggerContainerVariant}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {groups.map((group) => (
            <ProductGroupOverviewCard key={group.slug} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
