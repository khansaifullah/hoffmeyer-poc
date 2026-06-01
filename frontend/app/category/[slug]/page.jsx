import { Suspense } from "react";
import Header from "@/app/_components/Header";
import Newsletter from "@/app/_components/Newsletter";
import SectionLoader from "@/app/_components/SectionLoader";
import {
  ProductGroupBrandsSection,
  ProductGroupCategoriesSection,
  ProductGroupFeaturedProductsSection,
  ProductGroupHeroSection,
} from "@/app/_components/sections/ProductGroupSections";

export default async function ProductGroupPage({ params }) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <Suspense fallback={<SectionLoader label="Loading product group..." />}>
        <ProductGroupHeroSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading categories..." minHeight="min-h-[280px]" />}>
        <ProductGroupCategoriesSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading brands..." className="bg-[#f2f2f2]" />}>
        <ProductGroupBrandsSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SectionLoader label="Loading products..." minHeight="min-h-[320px]" />}>
        <ProductGroupFeaturedProductsSection slug={slug} />
      </Suspense>

      <Newsletter />
    </main>
  );
}
