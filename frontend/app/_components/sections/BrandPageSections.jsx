import BrandHero from "@/app/_components/BrandHero";
import CategorySubcategories from "@/app/_components/CategorySubcategories";
import CategoryFeaturedProducts from "@/app/_components/CategoryFeaturedProducts";
import { getBrandBySlug, getCategoryBySlug } from "@/lib/api-server";
import { notFound } from "next/navigation";

export async function BrandPageHeroSection({ slug, brandSlug }) {
  const [category, brand] = await Promise.all([
    getCategoryBySlug(slug),
    getBrandBySlug(brandSlug, { category: slug }),
  ]);

  if (!category || category.parentId || category.level !== "product_group" || !brand) {
    notFound();
  }

  return <BrandHero brand={brand} categorySlug={slug} categoryName={category.name} />;
}

export async function BrandPageSubcategoriesSection({ slug, brandSlug }) {
  const [category, brand] = await Promise.all([
    getCategoryBySlug(slug),
    getBrandBySlug(brandSlug, { category: slug }),
  ]);

  if (!category || !brand) {
    notFound();
  }

  return (
    <CategorySubcategories
      groupSlug={slug}
      subcategories={category.children || []}
      brandSlug={brand.slug}
      titleAccent="Shop"
      titleRest="by Category"
    />
  );
}

export async function BrandPageProductsSection({ slug, brandSlug }) {
  const brand = await getBrandBySlug(brandSlug, { category: slug });

  if (!brand) {
    notFound();
  }

  const category = await getCategoryBySlug(slug);
  const products = brand.products || [];

  return (
    <CategoryFeaturedProducts
      products={products}
      categoryName={category?.name || ""}
      categorySlug={slug}
    />
  );
}
