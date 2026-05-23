"use client";

import ListingHero from "./ListingHero";

export default function CompareHero() {
  return (
    <ListingHero
      title="Compare Products"
      description="Review selected products side by side to evaluate specifications, pricing, and availability."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Compare Products" },
      ]}
      showReadMore={false}
    />
  );
}
