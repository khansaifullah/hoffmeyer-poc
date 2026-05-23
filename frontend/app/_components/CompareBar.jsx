"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearCompareSlugs,
  getCompareHref,
  getCompareSlugs,
  MAX_COMPARE_PRODUCTS,
} from "@/lib/product-compare";
import { buttonRadius } from "@/lib/ui-presets";

export default function CompareBar() {
  const [slugs, setSlugs] = useState([]);

  useEffect(() => {
    const sync = () => setSlugs(getCompareSlugs());
    sync();

    window.addEventListener("hoffmeyer-compare-change", sync);
    return () => window.removeEventListener("hoffmeyer-compare-change", sync);
  }, []);

  if (!slugs.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <p className="text-[15px] font-bold text-[#333]">
            {slugs.length} product{slugs.length === 1 ? "" : "s"} selected for comparison
          </p>
          <p className="text-[13px] text-gray-500">
            Select up to {MAX_COMPARE_PRODUCTS} products to compare side by side.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              clearCompareSlugs();
              setSlugs([]);
            }}
            className={`h-11 border border-[#16568D] bg-white px-5 text-[14px] font-semibold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white ${buttonRadius}`}
          >
            Clear
          </button>
          <Link
            href={getCompareHref(slugs)}
            className={`inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
