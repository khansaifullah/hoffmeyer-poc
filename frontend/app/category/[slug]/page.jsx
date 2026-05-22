import { notFound } from "next/navigation";
import Header from "../../_components/Header";
import Newsletter from "../../_components/Newsletter";
import CategoryHero from "../../_components/CategoryHero";
import CategorySubcategories from "../../_components/CategorySubcategories";
import ShopByBrand from "../../_components/ShopByBrand";
import CategoryFeaturedProducts from "../../_components/CategoryFeaturedProducts";
import { getBrandsForCategory, getCategoryBySlug } from "@/lib/api-server";

export default async function CategoryDetail({ params }) {
  const { slug } = await params;
  const [category, brands] = await Promise.all([
    getCategoryBySlug(slug),
    getBrandsForCategory(slug),
  ]);

  if (!category || category.parentId) {
    notFound();
  }

  const products = category.products || [];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <CategoryHero category={category} />
      <CategorySubcategories
        categorySlug={slug}
        subcategories={category.children || []}
        titleAccent={category.name.toUpperCase()}
      />
      <ShopByBrand categorySlug={slug} categoryName={category.name} brands={brands} />
      <CategoryFeaturedProducts
        products={products}
        categoryName={category.name}
        categorySlug={slug}
      />

      <Newsletter />
    </main>
  );
}
