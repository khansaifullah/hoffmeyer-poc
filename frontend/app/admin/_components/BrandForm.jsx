"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brandToPayload, createBrand, updateBrand } from "@/lib/api";

const defaultForm = {
  name: "",
  slug: "",
  logo: "",
  description: "",
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

function brandToForm(brand) {
  if (!brand) return defaultForm;

  return {
    name: brand.name || "",
    slug: brand.slug || "",
    logo: brand.logo || "",
    description: brand.description || "",
    is_featured: brand.isFeatured ?? false,
    is_active: brand.isActive ?? true,
    sort_order: brand.sortOrder ?? 0,
  };
}

export default function BrandForm({ brandId = null, initialBrand = null }) {
  const router = useRouter();
  const [form, setForm] = useState(brandToForm(initialBrand));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = brandToPayload(form);

      if (brandId) {
        await updateBrand(brandId, payload);
      } else {
        await createBrand(payload);
      }

      router.push("/admin/brands");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save brand");
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
        Logo URL
        <input
          type="text"
          value={form.logo}
          onChange={(event) => updateField("logo", event.target.value)}
          placeholder="/images/brands/example.svg"
          className="mt-1 h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
        />
      </label>

      <label className="block text-[14px] font-semibold text-[#333]">
        Description
        <textarea
          rows={4}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
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

        <div className="flex flex-col gap-3 pt-7">
          <label className="flex items-center gap-3 text-[14px] font-semibold text-[#333]">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => updateField("is_active", event.target.checked)}
            />
            Active
          </label>
          <label className="flex items-center gap-3 text-[14px] font-semibold text-[#333]">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(event) => updateField("is_featured", event.target.checked)}
            />
            Featured on homepage
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="h-11 bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] disabled:opacity-50"
        >
          {saving ? "Saving..." : brandId ? "Update Brand" : "Create Brand"}
        </button>
        <Link href="/admin/brands" className="text-[14px] font-semibold text-[#16568D] hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
