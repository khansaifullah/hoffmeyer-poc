import { notFound } from "next/navigation";
import Header from "../../../../_components/Header";
import Newsletter from "../../../../_components/Newsletter";
import BrandHero from "../../../../_components/BrandHero";
import CategorySubcategories from "../../../../_components/CategorySubcategories";
import CategoryFeaturedProducts from "../../../../_components/CategoryFeaturedProducts";
import { getCategoryName } from "@/lib/categories";
import { getBrandBySlug } from "@/lib/brands";
import { getProductsForCategory } from "@/lib/category-products";
import { getSlug } from "@/lib/slug";

export default async function BrandPage({ params }) {
  const { slug, brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);

  if (!brand) {
    notFound();
  }

  const categoryName = getCategoryName(slug);
  const products = getProductsForCategory(slug, brand.name);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <BrandHero brand={brand} categorySlug={slug} />

      <CategorySubcategories
        slug={slug}
        brandSlug={getSlug(brand.name)}
        titleAccent="Shop"
        titleRest="by Category"
      />

      <CategoryFeaturedProducts
        products={products}
        categoryName={categoryName}
        categorySlug={slug}
      />

      <Newsletter />
    </main>
  );
}
