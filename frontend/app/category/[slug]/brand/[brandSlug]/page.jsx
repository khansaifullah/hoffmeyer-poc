import { Suspense } from "react";
import Header from "../../../../_components/Header";
import Newsletter from "../../../../_components/Newsletter";
import SectionLoader from "../../../../_components/SectionLoader";
import {
  BrandPageHeroSection,
  BrandPageProductsSection,
  BrandPageSubcategoriesSection,
} from "../../../../_components/sections/BrandPageSections";

export default async function BrandPage({ params }) {
  const { slug, brandSlug } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <Suspense fallback={<SectionLoader label="Loading brand..." />}>
        <BrandPageHeroSection slug={slug} brandSlug={brandSlug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading categories..." minHeight="min-h-[180px]" />}>
        <BrandPageSubcategoriesSection slug={slug} brandSlug={brandSlug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading products..." minHeight="min-h-[320px]" />}>
        <BrandPageProductsSection slug={slug} brandSlug={brandSlug} />
      </Suspense>

      <Newsletter />
    </main>
  );
}
