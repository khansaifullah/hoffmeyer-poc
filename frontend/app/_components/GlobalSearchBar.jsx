"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { fetchGlobalSearch } from "@/lib/api";

const LABEL_STYLES = {
  Product: "bg-[#16568D]/10 text-[#16568D]",
  Category: "bg-[#004b87]/10 text-[#004b87]",
  Subcategory: "bg-[#004b87]/10 text-[#004b87]",
  Brand: "bg-[#333]/10 text-[#333]",
};

function SearchIcon({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ResultSection({ title, items, onNavigate }) {
  if (!items.length) return null;

  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <p className="px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={`${item.type}-${item.slug}`}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#16568D]/8"
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  LABEL_STYLES[item.label] || LABEL_STYLES.Product
                }`}
              >
                {item.label}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-[#222]">{item.name}</span>
                {item.meta && (
                  <span className="mt-0.5 block truncate text-[12px] text-gray-500">{item.meta}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GlobalSearchBar({ variant = "desktop" }) {
  const listboxId = useId();
  const rootRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ products: [], categories: [], brands: [] });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isMobile = variant === "mobile";
  const totalResults =
    results.products.length + results.categories.length + results.brands.length;

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ products: [], categories: [], brands: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await fetchGlobalSearch(query);
        setResults(data);
        setOpen(true);
      } catch {
        setResults({ products: [], categories: [], brands: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavigate() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (event.target.value.trim().length >= 2) {
              setOpen(true);
            }
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
          placeholder="Search products, categories, brands..."
          aria-expanded={open}
          aria-controls={listboxId}
          className={
            isMobile
              ? "w-full rounded-xl bg-[#E7E7E7] py-3 pl-3 pr-11 text-[16px] font-medium text-zinc-700 placeholder:text-[#D4D4D4] outline-none"
              : "w-full rounded-lg bg-white py-2 pl-4 pr-11 text-[15px] font-medium text-[#333] placeholder:text-[#ccc] outline-none"
          }
        />
        <div
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
            isMobile ? "right-4 text-[#D4D4D4]" : "right-4 text-[#ccc]"
          }`}
        >
          <SearchIcon />
        </div>
      </div>

      {open && query.trim().length >= 2 && (
        <div
          id={listboxId}
          className={`absolute z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${
            isMobile ? "left-0 right-0 max-h-80 overflow-y-auto" : "left-0 right-0 max-h-96 overflow-y-auto"
          }`}
        >
          {loading ? (
            <p className="px-4 py-4 text-[14px] text-gray-500">Searching...</p>
          ) : totalResults === 0 ? (
            <p className="px-4 py-4 text-[14px] text-gray-500">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <>
              <ResultSection title="Products" items={results.products} onNavigate={handleNavigate} />
              <ResultSection title="Categories" items={results.categories} onNavigate={handleNavigate} />
              <ResultSection title="Brands" items={results.brands} onNavigate={handleNavigate} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
