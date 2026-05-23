"use client";

import { useEffect, useState } from "react";
import CategoryForm from "../../../_components/CategoryForm";
import { fetchAdminCategory } from "@/lib/api";
import { AdminEditPageSkeleton } from "../../../_components/AdminSkeletons";
import { AdminAlert, AdminFormCard, AdminPageHeader } from "../../../_components/AdminUi";

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
    return <AdminEditPageSkeleton fields={6} />;
  }

  if (error || !category) {
    return <AdminAlert>{error || "Category not found."}</AdminAlert>;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Edit Category" description={category.name} />
      <AdminFormCard>
        <CategoryForm categoryId={categoryId} initialCategory={category} />
      </AdminFormCard>
    </div>
  );
}
