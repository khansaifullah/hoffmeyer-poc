"use client";

import { useEffect, useState } from "react";
import { fetchBrands, fetchCategories, fetchProducts } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ categories: 0, subcategories: 0, brands: 0, products: 0 });
  const [error, setError] = useState("");

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
      }
    }

    load();
  }, []);

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Dashboard</h1>
      <p className="mt-2 text-[15px] text-gray-600">
        Catalog overview from the API. Storefront still uses static mocks until Phase 2+.
      </p>

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Categories</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.categories}</p>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Subcategories</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.subcategories}</p>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Brands</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.brands}</p>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Products</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.products}</p>
        </div>
      </div>
    </div>
  );
}
