"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FolderTreeIcon,
  LayersIcon,
  PackageIcon,
  StarIcon,
  UploadIcon,
  ExternalLinkIcon,
  PlusIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBrands, fetchCategories, fetchProducts } from "@/lib/api";
import { AdminDashboardSkeleton } from "./_components/AdminSkeletons";
import {
  AdminActionCard,
  AdminAlert,
  AdminPageHeader,
  AdminStatCard,
} from "./_components/AdminUi";

const quickActions = [
  {
    href: "/admin/products/new",
    title: "Add product",
    description: "Create a new catalog item with pricing, specs, and images.",
    icon: PlusIcon,
    primary: true,
  },
  {
    href: "/admin/categories/new",
    title: "Add category",
    description: "Organize products into groups, categories, or subcategories.",
    icon: FolderTreeIcon,
  },
  {
    href: "/admin/brands/new",
    title: "Add brand",
    description: "Add or update a manufacturer brand shown on the storefront.",
    icon: StarIcon,
  },
  {
    href: "/admin/products/import",
    title: "Import CSV",
    description: "Bulk upload products from a spreadsheet export.",
    icon: UploadIcon,
  },
];

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
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Monitor catalog health and jump into the tasks you use most."
      />

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <section aria-label="Catalog overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard
            href="/admin/categories"
            label="Product groups"
            value={stats.categories.toLocaleString()}
            icon={FolderTreeIcon}
          />
          <AdminStatCard
            href="/admin/categories"
            label="Subcategories"
            value={stats.subcategories.toLocaleString()}
            icon={LayersIcon}
            accent="bg-[#40A8F3]/15 text-[#16568D]"
          />
          <AdminStatCard
            href="/admin/brands"
            label="Brands"
            value={stats.brands.toLocaleString()}
            icon={StarIcon}
            accent="bg-amber-500/10 text-amber-700"
          />
          <AdminStatCard
            href="/admin/products"
            label="Products"
            value={stats.products.toLocaleString()}
            icon={PackageIcon}
            accent="bg-emerald-500/10 text-emerald-700"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-[#fafafa]/80">
            <CardTitle className="text-base text-[#333]">Quick actions</CardTitle>
            <CardDescription>Common catalog management tasks in one place.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
            {quickActions.map((action) => (
              <AdminActionCard key={action.href} {...action} />
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-[#fafafa]/80">
              <CardTitle className="text-base text-[#333]">Manage catalog</CardTitle>
              <CardDescription>Review and edit existing records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-4 sm:p-5">
              {[
                { href: "/admin/products", label: "All products", count: stats.products },
                { href: "/admin/categories", label: "Category tree", count: stats.categories + stats.subcategories },
                { href: "/admin/brands", label: "Brands", count: stats.brands },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-sm transition-colors hover:border-gray-200 hover:bg-[#f8fbfd]"
                >
                  <span className="font-medium text-[#333]">{item.label}</span>
                  <span className="tabular-nums text-muted-foreground">{item.count.toLocaleString()}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#16568D]/20 bg-gradient-to-br from-[#16568D] to-[#004b87] text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-white">Storefront preview</CardTitle>
              <CardDescription className="text-white/75">
                See how catalog changes appear to buyers on the live site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/catalog"
                className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
              >
                View product catalog
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
              >
                View homepage
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
