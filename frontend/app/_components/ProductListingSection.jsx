"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryProductListing from "./CategoryProductListing";
import { fetchProducts } from "@/lib/api";
import { LISTING_PAGE_SIZE } from "@/lib/listing";
import { buttonRadius } from "@/lib/ui-presets";

export default function ProductListingSection({
  products: initialProducts = [],
  categoryName,
  resultCount,
  lastPage: initialLastPage = 1,
  listingParams = null,
  pageSize = LISTING_PAGE_SIZE,
}) {
  const listingKey = useMemo(() => JSON.stringify(listingParams || {}), [listingParams]);
  const total = resultCount ?? initialProducts.length;

  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(initialLastPage);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(total);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setLastPage(initialLastPage);
    setDisplayCount(total);
  }, [initialProducts, initialLastPage, listingKey, total]);

  const loadMore = useCallback(async () => {
    if (!listingParams || loading || page >= lastPage) {
      return;
    }

    setLoading(true);

    try {
      const nextPage = page + 1;
      const { products: nextProducts, meta } = await fetchProducts({
        ...listingParams,
        per_page: pageSize,
        page: nextPage,
      });

      setProducts((current) => [...current, ...nextProducts]);
      setPage(nextPage);

      if (meta?.last_page) {
        setLastPage(meta.last_page);
      }
    } finally {
      setLoading(false);
    }
  }, [listingParams, loading, page, lastPage, pageSize]);

  const canLoadMore = Boolean(listingParams) && page < lastPage;

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
          totalResultCount={total}
          onFilteredCountChange={setDisplayCount}
        />

        {canLoadMore ? (
          <div className="mt-10 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className={`min-w-[220px] border border-[#16568D] bg-white px-8 py-3 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 ${buttonRadius}`}
            >
              {loading ? "Loading..." : "Load More Products"}
            </button>
            <p className="text-[12px] text-gray-500">
              Showing {products.length.toLocaleString()} of {total.toLocaleString()}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
