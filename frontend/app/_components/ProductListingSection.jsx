"use client";

import { useState } from "react";
import CategoryProductListing from "./CategoryProductListing";

export default function ProductListingSection({
  products,
  categoryName,
  resultCount,
}) {
  const baseCount = resultCount ?? products.length;
  const [displayCount, setDisplayCount] = useState(baseCount);

  return (
    <section className="bg-white px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] font-bold uppercase tracking-wide text-[#111]">
            {displayCount.toLocaleString()} Results
          </p>
          <p className="flex items-center gap-2 text-[12px] text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Photos may not represent actual items. Refer to name and product specs for all details.
          </p>
        </div>

        <CategoryProductListing
          products={products}
          categoryName={categoryName}
          totalResultCount={baseCount}
          onFilteredCountChange={setDisplayCount}
        />
      </div>
    </section>
  );
}
