"use client";

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { getCatalogHref, getProductGroupHref, getBrandInGroupHref } from "@/lib/catalog-urls";

export default function ListingHero({
  categorySlug = null,
  categoryHref = null,
  categoryName = null,
  title,
  description,
  brandName = null,
  brandSlug = null,
  breadcrumbItems: customBreadcrumbItems = null,
  showReadMore = true,
}) {
  const [expanded, setExpanded] = useState(false);
  const parentName = categoryName || categorySlug?.replace(/-/g, " ");
  const displayTitle = title || parentName;

  const summary =
    description ||
    (categorySlug
      ? `Shop ${displayTitle.toLowerCase()} for industrial applications. Hoffmeyer supplies reliable components with fast fulfillment for maintenance and MRO teams.`
      : "");

  const supplemental =
    "Compare specifications, check availability, and request a quote for volume pricing on qualified orders. Hoffmeyer supports plant maintenance, production uptime, and OEM-compatible sourcing across conveyor, power transmission, and fluid handling applications.";

  const breadcrumbItems =
    customBreadcrumbItems ||
    [
      { label: "Home", href: "/" },
      { label: "Product Catalog", href: getCatalogHref() },
      {
        label: parentName,
        href: categoryHref || (categorySlug ? getProductGroupHref(categorySlug) : getCatalogHref()),
        className: "capitalize",
      },
    ].concat(
      brandName && brandSlug
        ? [
            {
              label: brandName,
              href: getBrandInGroupHref(categorySlug, brandSlug),
            },
          ]
        : []
    ).concat([{ label: displayTitle }]);

  return (
    <section className="bg-[#40A8F3] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="relative inline-block pb-2 text-[28px] font-black uppercase leading-tight md:text-[36px]">
          {displayTitle}
          <span className="absolute bottom-0 left-0 h-[3px] w-16 bg-white/90" />
        </h1>

        {summary ? (
          <div className="mt-4 max-w-4xl text-[14px] leading-relaxed text-white/85 md:text-[15px]">
            <p className={showReadMore && !expanded ? "line-clamp-3" : ""}>{summary}</p>
            {showReadMore && expanded ? <p className="mt-3">{supplemental}</p> : null}
            {showReadMore ? (
              <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="mt-2 font-semibold text-white underline underline-offset-2 hover:text-white/90"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
