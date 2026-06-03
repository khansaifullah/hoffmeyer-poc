"use client";

import Link from "next/link";
import { useState } from "react";
import { getCatalogHref, getCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";

function Chevron({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MobileGroupSection({ group, expanded, onToggle, onNavigate }) {
  const categories = group.children || [];

  return (
    <div className="rounded-lg bg-gray-50/80">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[14px] font-semibold text-[#333]"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className="min-w-0 truncate">{group.name}</span>
        <Chevron open={expanded} />
      </button>

      {expanded && (
        <div className="space-y-1 border-t border-gray-200/80 px-3 pb-2.5 pt-1">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryHref(category)}
              className="block py-1.5 text-[13px] font-medium text-gray-600 hover:text-[#004b87]"
              onClick={onNavigate}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href={getProductGroupHref(group.slug)}
            className="block py-1.5 text-[12px] font-semibold text-[#16568D] hover:text-[#004b87]"
            onClick={onNavigate}
          >
            View all →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function MobileCategoriesNav({ productGroups = [], onNavigate }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [expandedGroupSlug, setExpandedGroupSlug] = useState(null);

  function handleNavigate() {
    onNavigate?.();
    setCategoriesOpen(false);
    setExpandedGroupSlug(null);
  }

  function toggleGroup(slug) {
    setExpandedGroupSlug((current) => (current === slug ? null : slug));
  }

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-[16px] font-bold text-[#333]"
        onClick={() => {
          setCategoriesOpen((current) => {
            if (current) setExpandedGroupSlug(null);
            return !current;
          });
        }}
        aria-expanded={categoriesOpen}
      >
        <span>Categories</span>
        <Chevron open={categoriesOpen} />
      </button>

      {categoriesOpen && (
        <div className="space-y-2 pb-3 pl-1">
          <Link
            href={getCatalogHref()}
            className="block px-3 py-2 text-[13px] font-semibold text-[#16568D] hover:text-[#004b87]"
            onClick={handleNavigate}
          >
            Browse full catalog →
          </Link>

          {productGroups.map((group) => (
            <MobileGroupSection
              key={group.slug}
              group={group}
              expanded={expandedGroupSlug === group.slug}
              onToggle={() => toggleGroup(group.slug)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
