"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setCategories(await fetchCategories());
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const topLevel = categories.filter((category) => !category.parentId);
  const subcategories = categories.filter((category) => category.parentId);

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Categories</h1>
      <p className="mt-2 text-[15px] text-gray-600">
        {topLevel.length} top-level and {subcategories.length} subcategories synced from mock data.
      </p>

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto border border-gray-200 bg-white">
        <table className="min-w-full text-left text-[14px]">
          <thead className="border-b border-gray-200 bg-gray-50 text-[12px] uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Products</th>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 font-semibold">Image</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#333]">{category.name}</td>
                  <td className="px-4 py-3 text-gray-600">{category.slug}</td>
                  <td className="px-4 py-3 text-gray-600">{category.parentId ? "Subcategory" : "Top-level"}</td>
                  <td className="px-4 py-3 text-gray-600">{category.productsCount ?? 0}</td>
                  <td className="px-4 py-3 text-gray-600">{category.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-gray-600">{category.image || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
