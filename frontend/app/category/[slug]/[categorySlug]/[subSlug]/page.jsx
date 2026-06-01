import { Suspense } from "react";
import Header from "@/app/_components/Header";
import Newsletter from "@/app/_components/Newsletter";
import SectionLoader from "@/app/_components/SectionLoader";
import {
  SubcategoryHeroSection,
  SubcategoryProductsSection,
} from "@/app/_components/sections/SubcategorySections";

export default async function SubcategoryPage({ params, searchParams }) {
  const { slug, categorySlug, subSlug } = await params;
  const resolvedSearch = await searchParams;
  const brandSlug = resolvedSearch?.brand || null;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <Suspense fallback={<SectionLoader label="Loading subcategory..." />}>
        <SubcategoryHeroSection
          slug={slug}
          categorySlug={categorySlug}
          subSlug={subSlug}
          brandSlug={brandSlug}
        />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading products..." minHeight="min-h-[360px]" />}>
        <SubcategoryProductsSection
          slug={slug}
          categorySlug={categorySlug}
          subSlug={subSlug}
          brandSlug={brandSlug}
        />
      </Suspense>

      <Newsletter />
    </main>
  );
}
