import { Suspense } from "react";
import Header from "@/app/_components/Header";
import Newsletter from "@/app/_components/Newsletter";
import SectionLoader from "@/app/_components/SectionLoader";
import {
  MidCategoryHeroSection,
  MidCategoryProductsSection,
  MidCategorySubcategoriesSection,
} from "@/app/_components/sections/MidCategorySections";

export default async function MidCategoryPage({ params, searchParams }) {
  const { slug, categorySlug } = await params;
  const resolvedSearch = await searchParams;
  const brandSlug = resolvedSearch?.brand || null;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <Suspense fallback={<SectionLoader label="Loading category..." />}>
        <MidCategoryHeroSection slug={slug} categorySlug={categorySlug} brandSlug={brandSlug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading subcategories..." minHeight="min-h-[180px]" />}>
        <MidCategorySubcategoriesSection
          slug={slug}
          categorySlug={categorySlug}
          brandSlug={brandSlug}
        />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading products..." minHeight="min-h-[360px]" />}>
        <MidCategoryProductsSection
          slug={slug}
          categorySlug={categorySlug}
          brandSlug={brandSlug}
        />
      </Suspense>

      <Newsletter />
    </main>
  );
}
