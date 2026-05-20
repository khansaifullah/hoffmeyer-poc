import Header from "../../../_components/Header";
import Newsletter from "../../../_components/Newsletter";
import ListingHero from "../../../_components/ListingHero";
import ProductListingSection from "../../../_components/ProductListingSection";
import { getCategoryName } from "@/lib/categories";
import { getSubcategoryName } from "@/lib/category-content";
import { getProductsForCategory } from "@/lib/category-products";
import { getBrandBySlug } from "@/lib/brands";

export default async function SubcategoryPage({ params, searchParams }) {
  const { slug, subSlug } = await params;
  const resolvedSearch = await searchParams;
  const brandSlug = resolvedSearch?.brand || null;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : null;

  const categoryName = getCategoryName(slug);
  const subcategoryName = getSubcategoryName(slug, subSlug);
  const products = getProductsForCategory(slug, brand?.name);

  const resultCount = brand ? Math.max(products.length * 791, products.length) : Math.max(products.length * 7921, products.length);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <ListingHero
        categorySlug={slug}
        categoryName={categoryName}
        title={subcategoryName.toUpperCase()}
        brandName={brand?.name}
        brandSlug={brandSlug}
        description={
          brand
            ? `Browse ${brand.name} ${subcategoryName.toLowerCase()} from Hoffmeyer. Source OEM-compatible parts with reliable availability for plant maintenance and production uptime.`
            : undefined
        }
      />

      <ProductListingSection
        products={products}
        categoryName={subcategoryName}
        resultCount={resultCount}
      />

      <Newsletter />
    </main>
  );
}
