"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const CATALOG_LEVELS = [
  { value: "product_group", label: "Product group" },
  { value: "category", label: "Category" },
  { value: "subcategory", label: "Subcategory" },
];

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

function inferCatalogLevel(category) {
  if (!category) return "product_group";
  if (category.level) return category.level;
  if (!category.parentId) return "product_group";
  return "subcategory";
}

function formatParentOption(category, catalogLevel) {
  const breadcrumb = category.breadcrumb || [];

  if (catalogLevel === "category") {
    return category.name;
  }

  if (breadcrumb.length >= 2) {
    return `${breadcrumb[0].name} › ${category.name}`;
  }

  return category.name;
}

export default function CategoryForm({ categoryId = null, initialCategory = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultLevelParam = searchParams.get("level");

  const [form, setForm] = useState(categoryToForm(initialCategory));
  const [catalogLevel, setCatalogLevel] = useState(() => {
    if (initialCategory) return inferCatalogLevel(initialCategory);
    if (["product_group", "category", "subcategory"].includes(defaultLevelParam || "")) {
      return defaultLevelParam;
    }
    return "product_group";
  });
  const [parentOptions, setParentOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const parentLevel = catalogLevel === "category" ? "product_group" : "category";
  const showParentField = catalogLevel !== "product_group";

  useEffect(() => {
    if (!showParentField) {
      setParentOptions([]);
      setOptionsLoading(false);
      return;
    }

    let active = true;
    setOptionsLoading(true);

    fetchAdminCategories({ level: parentLevel })
      .then((categories) => {
        if (!active) return;
        setParentOptions(categories);
      })
      .catch(() => {
        if (active) setParentOptions([]);
      })
      .finally(() => {
        if (active) setOptionsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [parentLevel, showParentField]);

  const parentSelectOptions = useMemo(
    () =>
      parentOptions.map((category) => ({
        value: String(category.id),
        label: formatParentOption(category, catalogLevel),
      })),
    [parentOptions, catalogLevel]
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleLevelChange(level) {
    setCatalogLevel(level);
    if (level === "product_group") {
      updateField("parent_id", "");
    } else {
      updateField("parent_id", "");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    if (showParentField && !form.parent_id) {
      const message =
        catalogLevel === "category"
          ? "Select a product group as the parent."
          : "Select a category as the parent.";
      setError(message);
      adminToastError("Missing parent.", message);
      setSaving(false);
      return;
    }

    try {
      const payload = {
        ...categoryToPayload(form),
        parent_id: showParentField ? Number(form.parent_id) : null,
        level: catalogLevel,
      };

      if (categoryId) {
        await updateCategory(categoryId, payload);
        adminToastSuccess("Category updated.", `"${form.name}" was saved successfully.`);
      } else {
        await createCategory(payload);
        adminToastSuccess("Category created.", `"${form.name}" was added to the catalog.`);
      }

      router.push(`/admin/categories?level=${catalogLevel}`);
      router.refresh();
    } catch (err) {
      const message = err.message || "Failed to save category";
      setError(message);
      adminToastError(categoryId ? "Could not update category." : "Could not create category.", message);
    } finally {
      setSaving(false);
    }
  }

  if (optionsLoading && showParentField) {
    return <AdminFormSkeleton fields={7} />;
  }

  const levelLabel = CATALOG_LEVELS.find((item) => item.value === catalogLevel)?.label || "Category";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminField label="Catalog level" htmlFor="category-level">
        <AdminSelect
          id="category-level"
          value={catalogLevel}
          onValueChange={handleLevelChange}
          disabled={Boolean(categoryId)}
          options={CATALOG_LEVELS}
        />
        {categoryId ? (
          <p className="mt-1 text-[12px] text-muted-foreground">
            Level is fixed after creation. Change the parent to move within the tree.
          </p>
        ) : (
          <p className="mt-1 text-[12px] text-muted-foreground">
            Product group → Category → Subcategory (three-level catalog tree).
          </p>
        )}
      </AdminField>

      {showParentField ? (
        <AdminField
          label={catalogLevel === "category" ? "Parent product group" : "Parent category"}
          htmlFor="category-parent"
        >
          <AdminSelect
            id="category-parent"
            value={form.parent_id}
            onValueChange={(value) => updateField("parent_id", value)}
            placeholder={
              catalogLevel === "category" ? "Select product group" : "Select category"
            }
            options={parentSelectOptions}
          />
        </AdminField>
      ) : null}

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

      <AdminField label="Image URL" htmlFor="category-image">
        <AdminInput
          id="category-image"
          type="text"
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
          placeholder="Leave blank for grey logo placeholder on storefront"
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

      {catalogLevel !== "subcategory" ? (
        <AdminField label="Hero Description" htmlFor="category-hero-description">
          <AdminTextarea
            id="category-hero-description"
            rows={3}
            value={form.hero_description}
            onChange={(event) => updateField("hero_description", event.target.value)}
          />
        </AdminField>
      ) : null}

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
          {saving ? "Saving..." : categoryId ? `Update ${levelLabel}` : `Create ${levelLabel}`}
        </AdminPrimaryButton>
        <AdminLinkButton href={`/admin/categories?level=${catalogLevel}`} variant="ghost">
          Cancel
        </AdminLinkButton>
      </AdminFormActions>
    </form>
  );
}
