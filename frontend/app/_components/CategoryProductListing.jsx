"use client";

import { useMemo, useState } from "react";
import { enrichProduct, formatPrice, parsePrice } from "@/lib/product";

function ProductListRow({ product, quantity, onQuantityChange, compared, onCompareChange }) {
  return (
    <article className="border border-gray-200 bg-white">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex items-start gap-4 p-4 lg:w-[72%] lg:border-r lg:border-gray-200">
          <div className="h-28 w-28 shrink-0 border border-gray-200 bg-white p-2">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[18px] font-bold leading-snug text-[#004b87]">
              {product.name}
            </h3>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-700">
              {product.description}
            </p>
            <div className="mt-3 space-y-0.5 text-[13px] text-gray-600">
              <p>
                <span className="font-semibold uppercase tracking-wide text-gray-500">
                  Hoffmeyer Item #
                </span>{" "}
                {product.itemNumber}
              </p>
              <p>
                <span className="font-semibold uppercase tracking-wide text-gray-500">
                  MFR #
                </span>{" "}
                {product.mfrNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-gray-200 p-4 lg:w-[28%] lg:border-t-0">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold leading-none text-[#111]">
                {formatPrice(product.price)}
              </span>
              <span className="text-[14px] text-gray-500">/each</span>
            </div>
            {product.inStock && (
              <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-green-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                In stock
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">
              Qty
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => onQuantityChange(Math.max(1, Number(event.target.value) || 1))}
              className="h-9 w-16 border border-gray-300 px-2 text-center text-[14px] outline-none focus:border-[#004b87]"
            />
          </div>

          <button
            type="button"
            className="h-11 w-full bg-[#004b87] text-[15px] font-bold text-white transition-colors hover:bg-[#003a63]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-2.5">
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-gray-600">
          <input
            type="checkbox"
            checked={compared}
            onChange={(event) => onCompareChange(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Compare
        </label>
      </div>
    </article>
  );
}

function ProductGridCard({ product, quantity, onQuantityChange }) {
  return (
    <article className="flex h-full flex-col border border-gray-200 bg-white p-4">
      <div className="mb-4 flex aspect-square items-center justify-center border border-gray-100 bg-[#fafafa] p-4">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </div>
      <h3 className="text-[16px] font-bold leading-snug text-[#004b87]">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-[13px] text-gray-600">{product.description}</p>
      <p className="mt-3 text-[22px] font-bold text-[#111]">
        {formatPrice(product.price)}
        <span className="text-[13px] font-normal text-gray-500"> /each</span>
      </p>
      {product.inStock && (
        <p className="mt-1 text-[13px] font-medium text-green-600">In stock</p>
      )}
      <div className="mt-auto flex items-center gap-3 pt-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => onQuantityChange(Math.max(1, Number(event.target.value) || 1))}
          className="h-9 w-14 border border-gray-300 px-2 text-center text-[14px] outline-none focus:border-[#004b87]"
        />
        <button
          type="button"
          className="h-9 flex-1 bg-[#004b87] text-[13px] font-bold text-white transition-colors hover:bg-[#003a63]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function CategoryProductListing({ products, categoryName = "Industrial" }) {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("best-match");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [compareSet, setCompareSet] = useState(new Set());

  const enrichedProducts = useMemo(
    () => products.map((product, index) => enrichProduct(product, index, categoryName)),
    [products, categoryName]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = enrichedProducts;

    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.itemNumber.includes(query) ||
          product.mfrNumber.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [enrichedProducts, search, sortBy]);

  const setQuantity = (slug, quantity) => {
    setQuantities((current) => ({ ...current, [slug]: quantity }));
  };

  const toggleCompare = (slug, checked) => {
    setCompareSet((current) => {
      const next = new Set(current);
      if (checked) next.add(slug);
      else next.delete(slug);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="hidden w-56 shrink-0 lg:block">
        <h3 className="mb-4 border-b border-gray-200 pb-2 text-[16px] font-bold text-[#333]">
          Filter By
        </h3>

        <div className="mb-6">
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-gray-400">
            Material
          </h4>
          <div className="flex flex-col gap-2.5 text-[14px] text-gray-700">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Rubber
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> PVC
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Synthetic
            </label>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-gray-400">
            Price Range
          </h4>
          <div className="flex flex-col gap-2.5 text-[14px] text-gray-700">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Under $100
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> $100 - $200
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Over $200
            </label>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-md overflow-hidden border border-gray-300">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search within results"
              className="h-10 flex-1 px-3 text-[14px] outline-none"
            />
            <button
              type="button"
              className="flex h-10 w-11 items-center justify-center bg-[#004b87] text-white"
              aria-label="Search within results"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 border border-gray-200 px-3 py-2 text-[13px] font-bold text-[#333] lg:hidden"
            >
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-10 border border-gray-300 bg-white px-3 text-[14px] text-[#333] outline-none"
            >
              <option value="best-match">Sorted by: Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <div className="flex overflow-hidden border border-gray-300">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`px-4 py-2 text-[14px] font-semibold transition-colors ${
                  view === "list"
                    ? "bg-[#004b87] text-white"
                    : "bg-white text-[#333] hover:bg-gray-50"
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`border-l border-gray-300 px-4 py-2 text-[14px] font-semibold transition-colors ${
                  view === "grid"
                    ? "bg-[#004b87] text-white"
                    : "bg-white text-[#333] hover:bg-gray-50"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        <p className="mb-4 text-[14px] text-gray-500">
          {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found
        </p>

        <div
          className={`mb-6 overflow-hidden transition-all duration-300 lg:hidden ${
            showMobileFilters ? "max-h-80 rounded border border-gray-200 bg-gray-50 p-4" : "max-h-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-4 text-[14px] text-gray-700">
            <div>
              <h4 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-gray-400">
                Material
              </h4>
              <label className="mb-2 flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Rubber
              </label>
              <label className="mb-2 flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> PVC
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Synthetic
              </label>
            </div>
            <div>
              <h4 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-gray-400">
                Price Range
              </h4>
              <label className="mb-2 flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Under $100
              </label>
              <label className="mb-2 flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> $100 - $200
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" /> Over $200
              </label>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-gray-200 bg-white px-6 py-16 text-center text-gray-500">
            No products match your search.
          </div>
        ) : view === "list" ? (
          <div className="space-y-0 border border-gray-200">
            {filteredProducts.map((product) => (
              <ProductListRow
                key={product.slug}
                product={product}
                quantity={quantities[product.slug] ?? 1}
                onQuantityChange={(quantity) => setQuantity(product.slug, quantity)}
                compared={compareSet.has(product.slug)}
                onCompareChange={(checked) => toggleCompare(product.slug, checked)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductGridCard
                key={product.slug}
                product={product}
                quantity={quantities[product.slug] ?? 1}
                onQuantityChange={(quantity) => setQuantity(product.slug, quantity)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
