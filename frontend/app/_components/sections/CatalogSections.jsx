import FeaturedProductGroups from "@/app/_components/FeaturedProductGroups";
import CatalogProductGroups from "@/app/_components/CatalogProductGroups";
import { getCatalogProductGroups, getLandingProductGroups } from "@/lib/api-server";

export async function LandingProductGroupsSection() {
  const productGroups = await getLandingProductGroups();
  return <FeaturedProductGroups groups={productGroups} />;
}

export async function CatalogProductGroupsSection() {
  let productGroups = [];

  try {
    productGroups = await getCatalogProductGroups();
  } catch {
    productGroups = [];
  }

  return <CatalogProductGroups groups={productGroups} />;
}
