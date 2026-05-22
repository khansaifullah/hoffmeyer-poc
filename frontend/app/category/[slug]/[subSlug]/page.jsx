import Header from "../../../_components/Header";
import Newsletter from "../../../_components/Newsletter";
import ListingHero from "../../../_components/ListingHero";
import ProductListingSection from "../../../_components/ProductListingSection";
import { getBrandBySlug, getCategoryBySlug, getProductsForListing } from "@/lib/api-server";
import { notFound } from "next/navigation";

export default async function SubcategoryPage({ params, searchParams }) {
  const { slug, subSlug } = await params;
  const resolvedSearch = await searchParams;
  const brandSlug = resolvedSearch?.brand || null;

  const category = await getCategoryBySlug(slug);

  if (!category || category.parentId) {
    notFound();
  }

  const subcategory = category.children?.find((child) => child.slug === subSlug);

  if (!subcategory) {
    notFound();
  }

  const brand = brandSlug ? await getBrandBySlug(brandSlug) : null;

  if (brandSlug && !brand) {
    notFound();
  }

  const { products, meta } = await getProductsForListing({
    subcategorySlug: subSlug,
    brandSlug: brandSlug || undefined,
  });

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <ListingHero
        categorySlug={slug}
        categoryName={category.name}
        title={subcategory.name.toUpperCase()}
        brandName={brand?.name}
        brandSlug={brandSlug}
        description={
          brand
            ? `Browse ${brand.name} ${subcategory.name.toLowerCase()} from Hoffmeyer. Source OEM-compatible parts with reliable availability for plant maintenance and production uptime.`
            : undefined
        }
      />

      <ProductListingSection
        products={products}
        categoryName={subcategory.name}
        resultCount={meta?.total ?? products.length}
      />

      <Newsletter />
    </main>
  );
}
