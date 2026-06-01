import { Suspense } from "react";
import Header from "../_components/Header";
import Newsletter from "../_components/Newsletter";
import ListingHero from "../_components/ListingHero";
import SectionLoader from "../_components/SectionLoader";
import { CatalogProductGroupsSection } from "../_components/sections/CatalogSections";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Product Catalog | Hoffmeyer",
  description: "Browse all Hoffmeyer product groups, categories, and industrial supply lines.",
};

export default function CatalogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <ListingHero
        title="Product Catalog"
        description="Browse every Hoffmeyer product group. Select a line to explore its categories, subcategories, and stocked products."
        showReadMore={false}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Product Catalog" },
        ]}
      />

      <Suspense
        fallback={
          <SectionLoader
            label="Loading catalog..."
            className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)]"
            minHeight="min-h-[480px]"
          />
        }
      >
        <CatalogProductGroupsSection />
      </Suspense>

      <Newsletter />
    </main>
  );
}
