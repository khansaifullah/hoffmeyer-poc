"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, LayoutGridIcon } from "lucide-react";
import { getCatalogHref, getCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";

const MAX_CATEGORIES = 5;

function getGroupCategoryHref(group, category) {
  return category.href || getCategoryHref(category) || getProductGroupHref(group.slug);
}

function GroupColumn({ group, onNavigate }) {
  const categories = (group.children || []).slice(0, MAX_CATEGORIES);
  const hasMore = (group.children || []).length > MAX_CATEGORIES;
  const groupHref = group.href || getProductGroupHref(group.slug);

  return (
    <div className="min-w-0">
      <Link
        href={groupHref}
        onClick={onNavigate}
        className="group mb-3 inline-flex items-center gap-2.5"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#16568D]/10 text-[#16568D] transition-colors group-hover:bg-[#16568D] group-hover:text-white">
          <LayoutGridIcon className="size-3.5" />
        </span>
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#004b87] group-hover:text-[#16568D]">
          {group.name}
        </span>
      </Link>

      <ul className="space-y-2 border-l-2 border-[#e8eef3] pl-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={getGroupCategoryHref(group, category)}
              onClick={onNavigate}
              className="block text-[13px] leading-snug text-[#4b5563] transition-colors hover:text-[#16568D]"
            >
              {category.name}
            </Link>
          </li>
        ))}
        {hasMore ? (
          <li>
            <Link
              href={groupHref}
              onClick={onNavigate}
              className="block text-[12px] font-semibold text-[#16568D] hover:text-[#004b87]"
            >
              View all →
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

const CLOSE_DELAY_MS = 120;

export default function CategoriesMegaMenu({ productGroups = [] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const closeMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
  };

  if (productGroups.length === 0) {
    return (
      <Link href={getCatalogHref()} className="flex items-center gap-1.5 text-[16px] font-bold text-white hover:text-white/85">
        Categories
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-1.5 text-[16px] font-bold text-white transition-colors hover:text-white/85"
      >
        Categories
        <ChevronDownIcon className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 w-[min(100vw-2rem,72rem)] pt-2">
          <div className="rounded-xl border border-[#d7e4ef] bg-white shadow-[0_20px_50px_rgba(0,75,135,0.15)]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 p-6 lg:grid-cols-3 xl:grid-cols-4">
              {productGroups.map((group) => (
                <GroupColumn key={group.slug} group={group} onNavigate={closeMenu} />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#e8eef3] bg-[#f8fbfd] px-6 py-3.5">
              <p className="text-[12px] text-[#5b6775]">Browse by product group, category, and subcategory.</p>
              <Link
                href={getCatalogHref()}
                onClick={closeMenu}
                className="text-[13px] font-bold text-[#16568D] transition-colors hover:text-[#004b87]"
              >
                Browse full catalog →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
