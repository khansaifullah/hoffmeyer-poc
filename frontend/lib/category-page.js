import { notFound, redirect } from "next/navigation";
import { categoryMatchesPath } from "@/lib/catalog-urls";

export function redirectToCategoryPath(category) {
  const path = category.breadcrumb?.map((node) => node.slug).join("/") || category.catalogPath;

  if (path) {
    redirect(`/category/${path}`);
  }

  notFound();
}

export function requireProductGroup(category, slug) {
  if (!category) {
    notFound();
  }

  if (category.level !== "product_group") {
    redirectToCategoryPath(category);
  }

  if (!categoryMatchesPath(category, slug)) {
    notFound();
  }

  return category;
}

export function requireMidCategory(category, slug, categorySlug) {
  if (!category || category.level !== "category" || !categoryMatchesPath(category, slug, categorySlug)) {
    notFound();
  }

  return category;
}

export function requireSubcategory(subcategory, slug, categorySlug, subSlug) {
  if (
    !subcategory ||
    subcategory.level !== "subcategory" ||
    !categoryMatchesPath(subcategory, slug, categorySlug, subSlug)
  ) {
    notFound();
  }

  return subcategory;
}
