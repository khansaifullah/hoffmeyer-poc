import ListingHero from "@/app/_components/ListingHero";
import ProductListingSection from "@/app/_components/ProductListingSection";
import { getBrandBySlug, getCategoryBySlug, getProductsForListing } from "@/lib/api-server";
import { getCategoryHref } from "@/lib/catalog-urls";
import { buildListingQueryParams } from "@/lib/listing";
import { notFound } from "next/navigation";
import { requireMidCategory, requireProductGroup, requireSubcategory } from "@/lib/category-page";

export async function SubcategoryHeroSection({
  slug,
  categorySlug,
  subSlug,
  brandSlug = null,
}) {
  const [group, category, subcategory] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(categorySlug),
    getCategoryBySlug(subSlug),
  ]);

  requireProductGroup(group, slug);
  requireMidCategory(category, slug, categorySlug);
  requireSubcategory(subcategory, slug, categorySlug, subSlug);

  const brand = brandSlug ? await getBrandBySlug(brandSlug) : null;

  if (brandSlug && !brand) {
    notFound();
  }

  return (
    <ListingHero
      categorySlug={slug}
      categoryName={group.name}
      title={subcategory.name.toUpperCase()}
      brandName={brand?.name}
      brandSlug={brandSlug}
      description={
        brand
          ? `Browse ${brand.name} ${subcategory.name.toLowerCase()} from Hoffmeyer. Source OEM-compatible parts with reliable availability for plant maintenance and production uptime.`
          : undefined
      }
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Product Catalog", href: "/catalog" },
        { label: group.name, href: getCategoryHref(group), className: "capitalize" },
        { label: category.name, href: getCategoryHref(category), className: "capitalize" },
        { label: subcategory.name, className: "capitalize" },
      ]}
    />
  );
}

export async function SubcategoryProductsSection({
  slug,
  categorySlug,
  subSlug,
  brandSlug = null,
}) {
  const subcategory = requireSubcategory(
    await getCategoryBySlug(subSlug),
    slug,
    categorySlug,
    subSlug
  );
  const listingParams = buildListingQueryParams({
    subcategorySlug: subSlug,
    brandSlug: brandSlug || undefined,
  });
  const { products, meta } = await getProductsForListing({
    subcategorySlug: subSlug,
    brandSlug: brandSlug || undefined,
  });

  return (
    <ProductListingSection
      products={products}
      categoryName={subcategory.name}
      resultCount={meta?.total ?? products.length}
      lastPage={meta?.last_page ?? 1}
      listingParams={listingParams}
    />
  );
}
