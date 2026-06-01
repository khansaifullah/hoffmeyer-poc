"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  productToPayload,
  updateProduct,
} from "@/lib/api";
import { AdminFormSkeleton } from "./AdminSkeletons";
import AdminImageUpload from "./AdminImageUpload";
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

const AVAILABILITY_OPTIONS = [
  { value: "in_stock", label: "In stock" },
  { value: "factory_order", label: "Factory order" },
  { value: "out_of_stock", label: "Out of stock" },
];

const MATERIAL_OPTIONS = ["Rubber", "PVC", "Synthetic"];

const EMPTY_SPEC = { label: "", value: "" };

function flattenSubcategoryOptions(categories, ancestors = []) {
  return categories.flatMap((category) => {
    const path = [...ancestors, category.name];

    if (category.level === "subcategory") {
      return [{ id: category.id, label: path.join(" > ") }];
    }

    if (category.children?.length) {
      return flattenSubcategoryOptions(category.children, path);
    }

    return [];
  });
}

function filterSubcategoryOptions(options, query, selectedIds) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  const matches = options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  const selectedNotVisible = options.filter(
    (option) =>
      selectedIds.includes(String(option.id)) &&
      !option.label.toLowerCase().includes(normalizedQuery)
  );

  return [...selectedNotVisible, ...matches];
}

const defaultForm = {
  category_ids: [],
  brand_id: "",
  name: "",
  slug: "",
  price: "",
  image: "",
  sku: "",
  item_number: "",
  mfr_number: "",
  material: "Synthetic",
  description: "",
  in_stock: true,
  availability_status: "in_stock",
  is_featured: false,
  sort_order: 0,
  images: [""],
  specs: [
    { label: "Material", value: "" },
    { label: "Tensile Strength", value: "3500 PSI" },
    { label: "Max Temperature", value: "250°F (121°C)" },
    { label: "Industry Standards", value: "ISO 9001, ASTM-D" },
    { label: "Country of Origin", value: "USA" },
    { label: "Weight Per Foot", value: "2.4 lbs" },
  ],
};

function productToForm(product) {
  if (!product) return defaultForm;

  return {
    category_ids: (product.categoryIds || (product.categoryId ? [product.categoryId] : [])).map(String),
    brand_id: product.brandId ? String(product.brandId) : "",
    name: product.name || "",
    slug: product.slug || "",
    price: product.price ?? "",
    image: product.image || "",
    sku: product.sku || "",
    item_number: product.itemNumber || "",
    mfr_number: product.mfrNumber || "",
    material: product.material || "Synthetic",
    description: product.description || "",
    in_stock: product.inStock ?? true,
    availability_status: product.availabilityStatus || "in_stock",
    is_featured: product.isFeatured ?? false,
    sort_order: product.sortOrder ?? 0,
    images:
      product.images?.length > 0
        ? product.images.map((image) => image.url)
        : product.image
          ? [product.image]
          : [""],
    specs:
      product.specs?.length > 0
        ? product.specs.map((spec) => ({ label: spec.label, value: spec.value }))
        : defaultForm.specs,
  };
}

export default function ProductForm({ productId = null, initialProduct = null }) {
  const router = useRouter();
  const [form, setForm] = useState(productToForm(initialProduct));
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [categoryTree, brandList] = await Promise.all([
          fetchCategories({ tree: true }),
          fetchBrands(),
        ]);
        setSubcategoryOptions(flattenSubcategoryOptions(categoryTree));
        setBrands(brandList);
      } catch (err) {
        setError(err.message || "Failed to load form options");
      } finally {
        setOptionsLoading(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    if (initialProduct) {
      setForm(productToForm(initialProduct));
    }
  }, [initialProduct]);

  const visibleSubcategoryOptions = useMemo(
    () => filterSubcategoryOptions(subcategoryOptions, categorySearch, form.category_ids),
    [subcategoryOptions, categorySearch, form.category_ids]
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateSpec(index, field, value) {
    setForm((current) => ({
      ...current,
      specs: current.specs.map((spec, specIndex) =>
        specIndex === index ? { ...spec, [field]: value } : spec
      ),
    }));
  }

  function updateImage(index, value) {
    setForm((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) => (imageIndex === index ? value : image)),
    }));
  }

  function toggleCategory(categoryId) {
    setForm((current) => {
      const id = String(categoryId);
      const selected = current.category_ids.includes(id)
        ? current.category_ids.filter((value) => value !== id)
        : [...current.category_ids, id];

      return { ...current, category_ids: selected };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.category_ids.length === 0) {
      setError("Select at least one subcategory.");
      return;
    }

    setLoading(true);

    try {
      const payload = productToPayload({
        ...form,
        category_ids: form.category_ids.map(Number),
        brand_id: form.brand_id ? Number(form.brand_id) : null,
        price: Number(form.price),
        sort_order: Number(form.sort_order) || 0,
        images: form.images.filter(Boolean),
        specs: form.specs.filter((spec) => spec.label && spec.value),
      });

      if (productId) {
        await updateProduct(productId, payload);
        adminToastSuccess("Product updated.", `"${form.name}" was saved successfully.`);
      } else {
        await createProduct(payload);
        adminToastSuccess("Product created.", `"${form.name}" was added to the catalog.`);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      const message = err.message || "Failed to save product";
      setError(message);
      adminToastError(productId ? "Could not update product." : "Could not create product.", message);
    } finally {
      setLoading(false);
    }
  }

  if (optionsLoading) {
    return <AdminFormSkeleton fields={8} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AdminField label="Name" htmlFor="product-name">
          <AdminInput
            id="product-name"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </AdminField>

        <AdminField label="Slug" htmlFor="product-slug">
          <AdminInput
            id="product-slug"
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="Auto-generated if empty"
          />
        </AdminField>

        <AdminField label="Categories" htmlFor="product-category-search" className="md:col-span-2">
          <AdminInput
            id="product-category-search"
            type="search"
            value={categorySearch}
            onChange={(event) => setCategorySearch(event.target.value)}
            placeholder="Search categories..."
            autoComplete="off"
          />
          <div
            id="product-categories"
            className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-border p-3"
          >
            {subcategoryOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No subcategories available.</p>
            ) : visibleSubcategoryOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No categories match your search.</p>
            ) : (
              visibleSubcategoryOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start gap-3 text-sm font-medium text-[#333]"
                >
                  <Checkbox
                    checked={form.category_ids.includes(String(option.id))}
                    onCheckedChange={() => toggleCategory(option.id)}
                    className="mt-0.5 data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
                  />
                  <span>{option.label}</span>
                </label>
              ))
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {form.category_ids.length > 0
              ? `${form.category_ids.length} selected`
              : "Select one or more subcategories"}
            {categorySearch.trim()
              ? ` · ${visibleSubcategoryOptions.length} shown`
              : ` · ${subcategoryOptions.length} total`}
            . The first selected category is used as the primary category.
          </p>
        </AdminField>

        <AdminField label="Brand" htmlFor="product-brand">
          <AdminSelect
            id="product-brand"
            value={form.brand_id}
            onValueChange={(value) => updateField("brand_id", value)}
            placeholder="None"
            options={[
              { value: "", label: "None" },
              ...brands.map((brand) => ({
                value: String(brand.id),
                label: brand.name,
              })),
            ]}
          />
        </AdminField>

        <AdminField label="Price" htmlFor="product-price">
          <AdminInput
            id="product-price"
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
          />
        </AdminField>

        <AdminField label="Material" htmlFor="product-material">
          <AdminSelect
            id="product-material"
            value={form.material}
            onValueChange={(value) => updateField("material", value)}
            options={MATERIAL_OPTIONS.map((material) => ({
              value: material,
              label: material,
            }))}
          />
        </AdminField>

        <AdminField label="SKU" htmlFor="product-sku">
          <AdminInput
            id="product-sku"
            value={form.sku}
            onChange={(event) => updateField("sku", event.target.value)}
          />
        </AdminField>

        <AdminField label="Item Number" htmlFor="product-item-number">
          <AdminInput
            id="product-item-number"
            value={form.item_number}
            onChange={(event) => updateField("item_number", event.target.value)}
          />
        </AdminField>

        <AdminField label="MFR Number" htmlFor="product-mfr-number">
          <AdminInput
            id="product-mfr-number"
            value={form.mfr_number}
            onChange={(event) => updateField("mfr_number", event.target.value)}
          />
        </AdminField>

        <AdminField label="Availability" htmlFor="product-availability">
          <AdminSelect
            id="product-availability"
            value={form.availability_status}
            onValueChange={(value) => updateField("availability_status", value)}
            options={AVAILABILITY_OPTIONS}
          />
        </AdminField>
      </div>

      <AdminField label="Primary Image" htmlFor="product-image-upload">
        <AdminImageUpload
          id="product-image-upload"
          value={form.image}
          onChange={(value) => updateField("image", value)}
          placeholder="Image URL or upload a file"
        />
      </AdminField>

      <AdminField label="Description" htmlFor="product-description">
        <AdminTextarea
          id="product-description"
          rows={4}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </AdminField>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 text-sm font-medium text-[#333]">
          <Checkbox
            checked={form.in_stock}
            onCheckedChange={(checked) => updateField("in_stock", Boolean(checked))}
            className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
          />
          In stock
        </label>
        <label className="flex items-center gap-3 text-sm font-medium text-[#333]">
          <Checkbox
            checked={form.is_featured}
            onCheckedChange={(checked) => updateField("is_featured", Boolean(checked))}
            className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
          />
          Featured
        </label>
      </div>

      <Separator />

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[#333]">Gallery Images</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => updateField("images", [...form.images, ""])}
            className="text-[#16568D] hover:text-[#16568D]"
          >
            Add image
          </Button>
        </div>
        <div className="space-y-4">
          {form.images.map((image, index) => (
            <div key={index} className="rounded-lg border border-border p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[#333]">Gallery image {index + 1}</p>
                {form.images.length > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateField(
                        "images",
                        form.images.filter((_, imageIndex) => imageIndex !== index)
                      )
                    }
                    className="text-muted-foreground"
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
              <AdminImageUpload
                id={`product-gallery-image-${index}`}
                value={image}
                onChange={(value) => updateImage(index, value)}
                placeholder={`Image URL ${index + 1} or upload a file`}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[#333]">Specifications</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => updateField("specs", [...form.specs, EMPTY_SPEC])}
            className="text-[#16568D] hover:text-[#16568D]"
          >
            Add spec
          </Button>
        </div>
        <div className="space-y-2">
          {form.specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <AdminInput
                value={spec.label}
                onChange={(event) => updateSpec(index, "label", event.target.value)}
                placeholder="Label"
              />
              <AdminInput
                value={spec.value}
                onChange={(event) => updateSpec(index, "value", event.target.value)}
                placeholder="Value"
              />
            </div>
          ))}
        </div>
      </div>

      <AdminFormActions>
        <AdminPrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </AdminPrimaryButton>
        <AdminLinkButton href="/admin/products" variant="ghost">
          Cancel
        </AdminLinkButton>
      </AdminFormActions>
    </form>
  );
}
