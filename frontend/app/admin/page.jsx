"use client";

import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ categories: 0, products: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [categories, products] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setStats({
          categories: categories.length,
          products: products.length,
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
        Read-only overview of catalog data from the API.
      </p>

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Categories</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.categories}</p>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-500">Products</p>
          <p className="mt-2 text-[36px] font-bold text-[#004b87]">{stats.products}</p>
        </div>
      </div>
    </div>
  );
}
