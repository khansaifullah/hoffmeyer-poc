"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCategory, fetchAdminCategories } from "@/lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCategories(await fetchAdminCategories());
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

  async function handleDelete(id) {
    if (!window.confirm("Delete this category?")) return;

    setDeletingId(id);
    setError("");

    try {
      await deleteCategory(id);
      setCategories((current) => current.filter((category) => category.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#333]">Categories</h1>
          <p className="mt-2 text-[15px] text-gray-600">
            {topLevel.length} top-level and {subcategories.length} subcategories in catalog.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex h-11 shrink-0 items-center justify-center bg-[#16568D] px-5 text-[14px] font-bold text-white hover:bg-[#124570]"
        >
          + Add Category
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border border-gray-200 bg-white px-4 py-3">
        <p className="text-[14px] text-gray-600">Manage top-level categories and subcategories.</p>
        <Link
          href="/admin/categories/new"
          className="inline-flex h-10 items-center justify-center border border-[#16568D] bg-white px-4 text-[13px] font-bold text-[#16568D] hover:bg-[#16568D]/5"
        >
          + New Category
        </Link>
      </div>

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
              <th className="px-4 py-3 font-semibold">Actions</th>
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
                  No categories found.{" "}
                  <Link href="/admin/categories/new" className="font-semibold text-[#16568D] hover:underline">
                    Add your first category
                  </Link>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#333]">{category.name}</td>
                  <td className="px-4 py-3 text-gray-600">{category.slug}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {category.parentId ? "Subcategory" : "Top-level"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{category.productsCount ?? 0}</td>
                  <td className="px-4 py-3 text-gray-600">{category.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="font-semibold text-[#16568D] hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        disabled={deletingId === category.id}
                        className="font-semibold text-red-600 hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
