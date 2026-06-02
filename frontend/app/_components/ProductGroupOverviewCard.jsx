"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cardHoverMotion, fadeUpVariant } from "@/lib/motion-presets";
import { getMidCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";
import { cardRadius } from "@/lib/ui-presets";
import ProductGroupCategoryTile from "./ProductGroupCategoryTile";

const PREVIEW_SLOTS = 4;

function PreviewPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[122px] rounded-xl border border-dashed border-[#e8eef3] bg-[#fbfdff]/60"
    />
  );
}

export default function ProductGroupOverviewCard({ group, categoryLimit = PREVIEW_SLOTS }) {
  const categories = (group.categories || group.children || []).slice(0, categoryLimit);
  const slots = Array.from({ length: PREVIEW_SLOTS }, (_, index) => categories[index] ?? null);

  return (
    <motion.article
      variants={fadeUpVariant}
      whileHover={cardHoverMotion}
      className={`flex h-[458px] flex-col overflow-hidden ${cardRadius} border border-[#d7e4ef] bg-white shadow-[0_8px_30px_rgba(0,75,135,0.06)] transition-shadow hover:shadow-[0_14px_40px_rgba(0,75,135,0.12)]`}
    >
      <div className="flex h-[118px] shrink-0 items-center justify-center bg-gradient-to-br from-[#16568D] to-[#004b87] px-4">
        <h3 className="line-clamp-2 text-center text-[17px] font-bold leading-[1.25] text-white md:text-[18px]">
          {group.name}
        </h3>
      </div>

      <div className="grid h-[288px] shrink-0 grid-cols-2 content-start gap-3 p-4">
        {slots.map((category, index) =>
          category ? (
            <ProductGroupCategoryTile
              key={category.slug}
              category={category}
              group={group}
              className="!min-h-[122px] h-[122px]"
            />
          ) : (
            <PreviewPlaceholder key={`empty-${index}`} />
          )
        )}
      </div>

      <div className="mt-auto flex h-[52px] shrink-0 items-center border-t border-[#e8eef3] bg-[#fbfdff] px-4">
        <Link
          href={getProductGroupHref(group.slug)}
          className="line-clamp-1 inline-flex items-center gap-2 text-[13px] font-bold text-[#16568D] transition-all hover:gap-3 hover:text-[#004b87]"
        >
          Explore {group.name}
          <span aria-hidden="true" className="shrink-0">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
