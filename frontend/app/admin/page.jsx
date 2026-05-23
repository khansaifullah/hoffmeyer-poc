"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBrands, fetchCategories, fetchProducts } from "@/lib/api";
import { AdminDashboardSkeleton } from "./_components/AdminSkeletons";
import { AdminAlert, AdminLinkButton, AdminPageHeader } from "./_components/AdminUi";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ categories: 0, subcategories: 0, brands: 0, products: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [categories, brands, productResult] = await Promise.all([
          fetchCategories(),
          fetchBrands(),
          fetchProducts({ per_page: 1 }),
        ]);

        setStats({
          categories: categories.filter((category) => !category.parentId).length,
          subcategories: categories.filter((category) => category.parentId).length,
          brands: brands.length,
          products: productResult.meta?.total ?? 0,
        });
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Catalog overview and quick actions. Storefront category, brand, and product pages use the API. The homepage stays static."
      >
        <AdminLinkButton href="/admin/products/new">+ Add Product</AdminLinkButton>
        <AdminLinkButton href="/admin/categories/new" variant="outline">
          + Add Category
        </AdminLinkButton>
        <AdminLinkButton href="/admin/brands/new" variant="outline">
          + Add Brand
        </AdminLinkButton>
        <AdminLinkButton href="/admin/products/import" variant="outline">
          Import CSV
        </AdminLinkButton>
      </AdminPageHeader>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Categories", value: stats.categories, href: "/admin/categories" },
          { label: "Subcategories", value: stats.subcategories, href: "/admin/categories" },
          { label: "Brands", value: stats.brands, href: "/admin/brands" },
          { label: "Products", value: stats.products, href: "/admin/products" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="group">
            <Card className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#004b87]">{item.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
