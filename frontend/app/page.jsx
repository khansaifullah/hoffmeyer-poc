import { Suspense } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import FeaturedProducts from "./_components/FeaturedProducts";
import FeaturedBrands from "./_components/FeaturedBrands";
import InfoSections from "./_components/InfoSections";
import Newsletter from "./_components/Newsletter";
import LandingSmoothScroll from "./_components/LandingSmoothScroll";
import SectionLoader from "./_components/SectionLoader";
import { LandingProductGroupsSection } from "./_components/sections/CatalogSections";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <LandingSmoothScroll />
      <Header />
      <Hero />

      <Suspense
        fallback={
          <SectionLoader
            label="Loading product groups..."
            className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)]"
            minHeight="min-h-[420px]"
          />
        }
      >
        <LandingProductGroupsSection />
      </Suspense>

      <FeaturedBrands title="Our Featured Brands" />
      <FeaturedProducts title="Our Top Selling Products" />
      <InfoSections />
      <Newsletter />
    </main>
  );
}
