"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  categoryToPayload,
  createCategory,
  fetchAdminCategories,
  updateCategory,
} from "@/lib/api";
import { AdminFormSkeleton } from "./AdminSkeletons";
import {
  AdminAlert,
  AdminField,
  AdminFormActions,
  AdminInput,
  AdminLinkButton,
  AdminPrimaryButton,
  AdminSelect,
  AdminTextarea,
  adminToastError,
  adminToastSuccess,
} from "./AdminUi";

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
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminCategories({ top_level: true })
      .then(setParentOptions)
      .catch(() => setParentOptions([]))
      .finally(() => setOptionsLoading(false));
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
        adminToastSuccess("Category updated.", `"${form.name}" was saved successfully.`);
      } else {
        await createCategory(payload);
        adminToastSuccess("Category created.", `"${form.name}" was added to the catalog.`);
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      const message = err.message || "Failed to save category";
      setError(message);
      adminToastError(categoryId ? "Could not update category." : "Could not create category.", message);
    } finally {
      setSaving(false);
    }
  }

  if (optionsLoading) {
    return <AdminFormSkeleton fields={6} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Name" htmlFor="category-name">
          <AdminInput
            id="category-name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </AdminField>

        <AdminField label="Slug" htmlFor="category-slug">
          <AdminInput
            id="category-slug"
            type="text"
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="Auto-generated if blank"
          />
        </AdminField>
      </div>

      <AdminField label="Parent Category" htmlFor="category-parent">
        <AdminSelect
          id="category-parent"
          value={form.parent_id}
          onValueChange={(value) => updateField("parent_id", value)}
          placeholder="Top-level category"
          options={[
            { value: "", label: "Top-level category" },
            ...parentOptions.map((category) => ({
              value: String(category.id),
              label: category.name,
            })),
          ]}
        />
      </AdminField>

      <AdminField label="Image URL" htmlFor="category-image">
        <AdminInput
          id="category-image"
          type="text"
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
        />
      </AdminField>

      <AdminField label="Description" htmlFor="category-description">
        <AdminTextarea
          id="category-description"
          rows={3}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </AdminField>

      <AdminField label="Hero Description" htmlFor="category-hero-description">
        <AdminTextarea
          id="category-hero-description"
          rows={3}
          value={form.hero_description}
          onChange={(event) => updateField("hero_description", event.target.value)}
        />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Sort Order" htmlFor="category-sort-order">
          <AdminInput
            id="category-sort-order"
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(event) => updateField("sort_order", Number(event.target.value))}
          />
        </AdminField>

        <label className="flex items-center gap-3 pt-8 text-sm font-medium text-[#333]">
          <Checkbox
            checked={form.is_active}
            onCheckedChange={(checked) => updateField("is_active", Boolean(checked))}
            className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
          />
          Active
        </label>
      </div>

      <AdminFormActions>
        <AdminPrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving..." : categoryId ? "Update Category" : "Create Category"}
        </AdminPrimaryButton>
        <AdminLinkButton href="/admin/categories" variant="ghost">
          Cancel
        </AdminLinkButton>
      </AdminFormActions>
    </form>
  );
}
