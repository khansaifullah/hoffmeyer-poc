"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { brandToPayload, createBrand, updateBrand } from "@/lib/api";
import {
  AdminAlert,
  AdminField,
  AdminFormActions,
  AdminInput,
  AdminLinkButton,
  AdminPrimaryButton,
  AdminTextarea,
  adminToastError,
  adminToastSuccess,
} from "./AdminUi";

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
        adminToastSuccess("Brand updated.", `"${form.name}" was saved successfully.`);
      } else {
        await createBrand(payload);
        adminToastSuccess("Brand created.", `"${form.name}" was added to the catalog.`);
      }

      router.push("/admin/brands");
      router.refresh();
    } catch (err) {
      const message = err.message || "Failed to save brand";
      setError(message);
      adminToastError(brandId ? "Could not update brand." : "Could not create brand.", message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Name" htmlFor="brand-name">
          <AdminInput
            id="brand-name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </AdminField>

        <AdminField label="Slug" htmlFor="brand-slug">
          <AdminInput
            id="brand-slug"
            type="text"
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="Auto-generated if blank"
          />
        </AdminField>
      </div>

      <AdminField label="Logo URL" htmlFor="brand-logo">
        <AdminInput
          id="brand-logo"
          type="text"
          value={form.logo}
          onChange={(event) => updateField("logo", event.target.value)}
          placeholder="/images/brands/example.svg"
        />
      </AdminField>

      <AdminField label="Description" htmlFor="brand-description">
        <AdminTextarea
          id="brand-description"
          rows={4}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Sort Order" htmlFor="brand-sort-order">
          <AdminInput
            id="brand-sort-order"
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(event) => updateField("sort_order", Number(event.target.value))}
          />
        </AdminField>

        <div className="flex flex-col gap-4 pt-8">
          <label className="flex items-center gap-3 text-sm font-medium text-[#333]">
            <Checkbox
              checked={form.is_active}
              onCheckedChange={(checked) => updateField("is_active", Boolean(checked))}
              className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
            />
            Active
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-[#333]">
            <Checkbox
              checked={form.is_featured}
              onCheckedChange={(checked) => updateField("is_featured", Boolean(checked))}
              className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
            />
            Featured on homepage
          </label>
        </div>
      </div>

      <AdminFormActions>
        <AdminPrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving..." : brandId ? "Update Brand" : "Create Brand"}
        </AdminPrimaryButton>
        <AdminLinkButton href="/admin/brands" variant="ghost">
          Cancel
        </AdminLinkButton>
      </AdminFormActions>
    </form>
  );
}
