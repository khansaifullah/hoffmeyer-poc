"use client";

import Link from "next/link";
import { useState } from "react";
import { getCatalogHref, getCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";

function MobileGroupSection({ group, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const categories = group.children || [];

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2.5 text-left text-[15px] font-semibold text-[#333] hover:text-[#004b87]"
        onClick={() => setExpanded((current) => !current)}
      >
        <span>{group.name}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 pb-2" : "max-h-0"}`}>
        <div className="flex flex-col gap-2 pl-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryHref(category)}
              className="text-[14px] font-medium text-gray-600 hover:text-[#004b87]"
              onClick={onNavigate}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href={getProductGroupHref(group.slug)}
            className="text-[13px] font-semibold text-[#16568D] hover:text-[#004b87]"
            onClick={onNavigate}
          >
            View all {group.name} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MobileCategoriesNav({ productGroups = [], onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-2">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-[18px] font-bold text-[#333] hover:text-[#004b87]"
        onClick={() => setOpen((current) => !current)}
      >
        <span>Categories</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[70vh] mt-2 mb-2 overflow-y-auto" : "max-h-0"}`}>
        <div className="flex flex-col gap-1 pl-2">
          {productGroups.map((group) => (
            <MobileGroupSection
              key={group.slug}
              group={group}
              onNavigate={() => {
                onNavigate?.();
                setOpen(false);
              }}
            />
          ))}
          <Link
            href={getCatalogHref()}
            className="py-2 text-[14px] font-bold text-[#16568D] hover:text-[#004b87]"
            onClick={() => {
              onNavigate?.();
              setOpen(false);
            }}
          >
            Browse full catalog →
          </Link>
        </div>
      </div>
    </div>
  );
}
