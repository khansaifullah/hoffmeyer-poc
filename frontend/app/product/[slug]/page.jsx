import { Suspense } from "react";
import Header from "../../_components/Header";
import Newsletter from "../../_components/Newsletter";
import SectionLoader from "../../_components/SectionLoader";
import { ProductDetailSection } from "../../_components/sections/ProductDetailSection";
import { getProductBySlug } from "@/lib/api-server";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Hoffmeyer" };
  }

  return {
    title: `${product.name} | Hoffmeyer`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <Suspense fallback={<SectionLoader label="Loading product..." minHeight="min-h-[480px]" />}>
        <ProductDetailSection slug={slug} />
      </Suspense>

      <Newsletter />
    </main>
  );
}
