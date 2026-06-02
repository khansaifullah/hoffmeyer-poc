"use client";

import ListingHero from "./ListingHero";

export default function ResourcesHero() {
  return (
    <ListingHero
      title="Resources"
      description="Everything you need to source, quote, and support industrial belting, bearings, hose, and MRO components — from catalog browsing to expert cross-reference help."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Resources" },
      ]}
      showReadMore={false}
    />
  );
}
