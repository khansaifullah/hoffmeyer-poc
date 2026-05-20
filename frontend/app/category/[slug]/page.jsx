import Header from "../../_components/Header";
import Newsletter from "../../_components/Newsletter";
import CategoryHero from "../../_components/CategoryHero";
import CategorySubcategories from "../../_components/CategorySubcategories";
import ShopByBrand from "../../_components/ShopByBrand";
import CategoryFeaturedProducts from "../../_components/CategoryFeaturedProducts";
import { getCategoryName } from "@/lib/categories";
import { getProductsForCategory } from "@/lib/category-products";

export default async function CategoryDetail({ params }) {
  const { slug } = await params;
  const categoryName = getCategoryName(slug);
  const products = getProductsForCategory(slug);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <CategoryHero slug={slug} />
      <CategorySubcategories slug={slug} />
      <ShopByBrand slug={slug} />
      <CategoryFeaturedProducts
        products={products}
        categoryName={categoryName}
        categorySlug={slug}
      />

      <Newsletter />
    </main>
  );
}
