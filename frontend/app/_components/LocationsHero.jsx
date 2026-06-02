"use client";

import ListingHero from "./ListingHero";

export default function LocationsHero() {
  return (
    <ListingHero
      title="Locations"
      description="Seven Hoffmeyer branches across California, Oregon, and Washington — plus corporate support for conveyor belting, hose, power transmission, and MRO supplies."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Locations" },
      ]}
      showReadMore={false}
    />
  );
}
