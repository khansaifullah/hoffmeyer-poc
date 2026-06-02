import ListingHero from "@/app/_components/ListingHero";
import CategorySubcategories from "@/app/_components/CategorySubcategories";
import ProductListingSection from "@/app/_components/ProductListingSection";
import { getBrandBySlug, getCategoryBySlug, getProductsForListing } from "@/lib/api-server";
import { getCategoryHref } from "@/lib/catalog-urls";
import { buildListingQueryParams } from "@/lib/listing";
import { notFound } from "next/navigation";
import { requireMidCategory, requireProductGroup } from "@/lib/category-page";

export async function MidCategoryHeroSection({ slug, categorySlug, brandSlug = null }) {
  const [group, category] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(categorySlug),
  ]);

  requireProductGroup(group, slug);
  requireMidCategory(category, slug, categorySlug);

  const brand = brandSlug ? await getBrandBySlug(brandSlug) : null;

  if (brandSlug && !brand) {
    notFound();
  }

  return (
    <ListingHero
      categorySlug={slug}
      categoryName={group.name}
      title={category.name.toUpperCase()}
      brandName={brand?.name}
      brandSlug={brandSlug}
      description={`Browse ${category.name.toLowerCase()} products within ${group.name}.`}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Product Catalog", href: "/catalog" },
        { label: group.name, href: getCategoryHref(group), className: "capitalize" },
        { label: category.name, className: "capitalize" },
      ]}
    />
  );
}

export async function MidCategorySubcategoriesSection({
  slug,
  categorySlug,
  brandSlug = null,
}) {
  const category = requireMidCategory(await getCategoryBySlug(categorySlug), slug, categorySlug);

  return (
    <CategorySubcategories
      groupSlug={slug}
      categorySlug={categorySlug}
      subcategories={category.children || []}
      brandSlug={brandSlug}
      titleAccent={category.name.toUpperCase()}
      titleRest="Subcategories"
    />
  );
}

export async function MidCategoryProductsSection({
  slug,
  categorySlug,
  brandSlug = null,
}) {
  const category = requireMidCategory(await getCategoryBySlug(categorySlug), slug, categorySlug);
  const listingParams = buildListingQueryParams({
    categorySlug,
    brandSlug: brandSlug || undefined,
  });
  const { products, meta } = await getProductsForListing({
    categorySlug,
    brandSlug: brandSlug || undefined,
  });

  return (
    <ProductListingSection
      products={products}
      categoryName={category.name}
      resultCount={meta?.total ?? products.length}
      lastPage={meta?.last_page ?? 1}
      listingParams={listingParams}
    />
  );
}
