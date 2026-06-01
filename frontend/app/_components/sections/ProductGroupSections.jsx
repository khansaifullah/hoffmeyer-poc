import CategoryHero from "@/app/_components/CategoryHero";
import ProductGroupCategoriesGrid from "@/app/_components/ProductGroupCategoriesGrid";
import ShopByBrand from "@/app/_components/ShopByBrand";
import CategoryFeaturedProducts from "@/app/_components/CategoryFeaturedProducts";
import { getBrandsForCategory, getCategoryBySlug, getProductsForListing } from "@/lib/api-server";
import { requireProductGroup } from "@/lib/category-page";

export async function ProductGroupHeroSection({ slug }) {
  const category = requireProductGroup(await getCategoryBySlug(slug), slug);
  return <CategoryHero category={category} />;
}

export async function ProductGroupCategoriesSection({ slug }) {
  const category = requireProductGroup(await getCategoryBySlug(slug), slug);

  return (
    <ProductGroupCategoriesGrid
      group={category}
      categories={category.children || []}
      titleAccent={category.name.toUpperCase()}
      titleRest="Categories"
    />
  );
}

export async function ProductGroupBrandsSection({ slug }) {
  const category = requireProductGroup(await getCategoryBySlug(slug), slug);
  const brands = await getBrandsForCategory(slug);

  return <ShopByBrand categorySlug={slug} categoryName={category.name} brands={brands} />;
}

export async function ProductGroupFeaturedProductsSection({ slug }) {
  const category = requireProductGroup(await getCategoryBySlug(slug), slug);
  const { products } = await getProductsForListing({ productGroup: slug, perPage: 12 });

  return (
    <CategoryFeaturedProducts
      products={products}
      categoryName={category.name}
      categorySlug={slug}
    />
  );
}
