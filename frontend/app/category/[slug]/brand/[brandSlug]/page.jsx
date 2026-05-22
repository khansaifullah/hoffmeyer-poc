import { notFound } from "next/navigation";
import Header from "../../../../_components/Header";
import Newsletter from "../../../../_components/Newsletter";
import BrandHero from "../../../../_components/BrandHero";
import CategorySubcategories from "../../../../_components/CategorySubcategories";
import CategoryFeaturedProducts from "../../../../_components/CategoryFeaturedProducts";
import { getBrandBySlug, getCategoryBySlug } from "@/lib/api-server";

export default async function BrandPage({ params }) {
  const { slug, brandSlug } = await params;
  const [category, brand] = await Promise.all([
    getCategoryBySlug(slug),
    getBrandBySlug(brandSlug, { category: slug }),
  ]);

  if (!category || category.parentId || !brand) {
    notFound();
  }

  const products = brand.products || [];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <BrandHero brand={brand} categorySlug={slug} categoryName={category.name} />

      <CategorySubcategories
        categorySlug={slug}
        subcategories={category.children || []}
        brandSlug={brand.slug}
        titleAccent="Shop"
        titleRest="by Category"
      />

      <CategoryFeaturedProducts
        products={products}
        categoryName={category.name}
        categorySlug={slug}
      />

      <Newsletter />
    </main>
  );
}
