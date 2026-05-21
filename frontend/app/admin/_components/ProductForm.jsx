"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  productToPayload,
  updateProduct,
} from "@/lib/api";

const AVAILABILITY_OPTIONS = [
  { value: "in_stock", label: "In stock" },
  { value: "factory_order", label: "Factory order" },
  { value: "out_of_stock", label: "Out of stock" },
];

const MATERIAL_OPTIONS = ["Rubber", "PVC", "Synthetic"];

const EMPTY_SPEC = { label: "", value: "" };

const defaultForm = {
  category_id: "",
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
    category_id: String(product.categoryId || product.category?.id || ""),
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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [categoryList, brandList] = await Promise.all([fetchCategories(), fetchBrands()]);
        setCategories(categoryList.filter((category) => !category.parentId));
        setBrands(brandList);
      } catch (err) {
        setError(err.message || "Failed to load form options");
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    if (initialProduct) {
      setForm(productToForm(initialProduct));
    }
  }, [initialProduct]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = productToPayload({
        ...form,
        category_id: Number(form.category_id),
        brand_id: form.brand_id ? Number(form.brand_id) : null,
        price: Number(form.price),
        sort_order: Number(form.sort_order) || 0,
        images: form.images.filter(Boolean),
        specs: form.specs.filter((spec) => spec.label && spec.value),
      });

      if (productId) {
        await updateProduct(productId, payload);
      } else {
        await createProduct(payload);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Slug
          </label>
          <input
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="Auto-generated if empty"
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Category
          </label>
          <select
            required
            value={form.category_id}
            onChange={(event) => updateField("category_id", event.target.value)}
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] outline-none focus:border-[#004b87]"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Brand
          </label>
          <select
            value={form.brand_id}
            onChange={(event) => updateField("brand_id", event.target.value)}
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] outline-none focus:border-[#004b87]"
          >
            <option value="">None</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Price
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Material
          </label>
          <select
            value={form.material}
            onChange={(event) => updateField("material", event.target.value)}
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] outline-none focus:border-[#004b87]"
          >
            {MATERIAL_OPTIONS.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            SKU
          </label>
          <input
            value={form.sku}
            onChange={(event) => updateField("sku", event.target.value)}
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Item Number
          </label>
          <input
            value={form.item_number}
            onChange={(event) => updateField("item_number", event.target.value)}
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            MFR Number
          </label>
          <input
            value={form.mfr_number}
            onChange={(event) => updateField("mfr_number", event.target.value)}
            className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Availability
          </label>
          <select
            value={form.availability_status}
            onChange={(event) => updateField("availability_status", event.target.value)}
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] outline-none focus:border-[#004b87]"
          >
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
          Primary Image URL
        </label>
        <input
          value={form.image}
          onChange={(event) => updateField("image", event.target.value)}
          className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
        />
      </div>

      <div>
        <label className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
          Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="w-full border border-gray-300 px-3 py-2 text-[15px] outline-none focus:border-[#004b87]"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-[14px] text-gray-700">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(event) => updateField("in_stock", event.target.checked)}
          />
          In stock
        </label>
        <label className="flex items-center gap-2 text-[14px] text-gray-700">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(event) => updateField("is_featured", event.target.checked)}
          />
          Featured
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#333]">Gallery Images</h2>
          <button
            type="button"
            onClick={() => updateField("images", [...form.images, ""])}
            className="text-[13px] font-semibold text-[#16568D] hover:underline"
          >
            Add image
          </button>
        </div>
        <div className="space-y-2">
          {form.images.map((image, index) => (
            <input
              key={index}
              value={image}
              onChange={(event) => updateImage(index, event.target.value)}
              placeholder={`Image URL ${index + 1}`}
              className="h-11 w-full border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#333]">Specifications</h2>
          <button
            type="button"
            onClick={() => updateField("specs", [...form.specs, EMPTY_SPEC])}
            className="text-[13px] font-semibold text-[#16568D] hover:underline"
          >
            Add spec
          </button>
        </div>
        <div className="space-y-2">
          {form.specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <input
                value={spec.label}
                onChange={(event) => updateSpec(index, "label", event.target.value)}
                placeholder="Label"
                className="h-11 border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
              />
              <input
                value={spec.value}
                onChange={(event) => updateSpec(index, "value", event.target.value)}
                placeholder="Value"
                className="h-11 border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="h-11 bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] disabled:opacity-60"
        >
          {loading ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="flex h-11 items-center border border-gray-300 px-6 text-[14px] font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
