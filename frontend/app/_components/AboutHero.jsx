"use client";

import ListingHero from "./ListingHero";

export default function AboutHero() {
  return (
    <ListingHero
      title="About Us"
      description="Founded in Oakland, California in 1921, Hoffmeyer Company has grown from a belting and supply shop into a premier supplier of industrial rubber products, conveyor belts, power transmission equipment, and MRO supplies."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "About Us" },
      ]}
      showReadMore={false}
    />
  );
}
