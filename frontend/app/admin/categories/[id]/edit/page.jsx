"use client";

import { useEffect, useState } from "react";
import CategoryForm from "../../../_components/CategoryForm";
import { fetchAdminCategory } from "@/lib/api";

export default function EditCategoryPage({ params }) {
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resolved = await params;
        const id = resolved.id;
        setCategoryId(id);
        setCategory(await fetchAdminCategory(id));
      } catch (err) {
        setError(err.message || "Failed to load category");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params]);

  if (loading) {
    return <p className="text-[15px] text-gray-600">Loading category...</p>;
  }

  if (error || !category) {
    return (
      <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
        {error || "Category not found."}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Edit Category</h1>
      <p className="mt-2 text-[15px] text-gray-600">{category.name}</p>
      <div className="mt-8 max-w-3xl border border-gray-200 bg-white p-6">
        <CategoryForm categoryId={categoryId} initialCategory={category} />
      </div>
    </div>
  );
}
