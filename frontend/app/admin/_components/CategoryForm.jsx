"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  categoryToPayload,
  createCategory,
  fetchAdminCategories,
  updateCategory,
} from "@/lib/api";

const defaultForm = {
  parent_id: "",
  name: "",
  slug: "",
  image: "",
  description: "",
  hero_description: "",
  sort_order: 0,
  is_active: true,
};

function categoryToForm(category) {
  if (!category) return defaultForm;

  return {
    parent_id: category.parentId ? String(category.parentId) : "",
    name: category.name || "",
    slug: category.slug || "",
    image: category.image || "",
    description: category.description || "",
    hero_description: category.heroDescription || "",
    sort_order: category.sortOrder ?? 0,
    is_active: category.isActive ?? true,
  };
}

export default function CategoryForm({ categoryId = null, initialCategory = null }) {
  const router = useRouter();
  const [form, setForm] = useState(categoryToForm(initialCategory));
  const [parentOptions, setParentOptions] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminCategories({ top_level: true })
      .then(setParentOptions)
      .catch(() => setParentOptions([]));
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = categoryToPayload(form);

      if (categoryId) {
        await updateCategory(categoryId, payload);
      } else {
        await createCategory(payload);
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-[14px] font-semibold text-[#333]">
          Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </label>

        <label className="block text-[14px] font-semibold text-[#333]">
          Slug
          <input
            type="text"
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="Auto-generated if blank"
            className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </label>
      </div>

      <label className="block text-[14px] font-semibold text-[#333]">
        Parent Category
        <select
          value={form.parent_id}
          onChange={(event) => updateField("parent_id", event.target.value)}
          className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
        >
          <option value="">Top-level category</option>
          {parentOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-[14px] font-semibold text-[#333]">
        Image URL
        <input
          type="text"
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
          className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
        />
      </label>

      <label className="block text-[14px] font-semibold text-[#333]">
        Description
        <textarea
          rows={3}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="mt-1 w-full border border-gray-300 px-3 py-2 text-[15px] outline-none focus:border-[#004b87]"
        />
      </label>

      <label className="block text-[14px] font-semibold text-[#333]">
        Hero Description
        <textarea
          rows={3}
          value={form.hero_description}
          onChange={(event) => updateField("hero_description", event.target.value)}
          className="mt-1 w-full border border-gray-300 px-3 py-2 text-[15px] outline-none focus:border-[#004b87]"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-[14px] font-semibold text-[#333]">
          Sort Order
          <input
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(event) => updateField("sort_order", Number(event.target.value))}
            className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </label>

        <label className="flex items-center gap-3 pt-7 text-[14px] font-semibold text-[#333]">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(event) => updateField("is_active", event.target.checked)}
          />
          Active
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="h-11 bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] disabled:opacity-50"
        >
          {saving ? "Saving..." : categoryId ? "Update Category" : "Create Category"}
        </button>
        <Link href="/admin/categories" className="text-[14px] font-semibold text-[#16568D] hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
