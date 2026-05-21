"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "../../../_components/ProductForm";
import { fetchAdminProduct } from "@/lib/api";

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setProduct(await fetchAdminProduct(id));
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <p className="text-[15px] text-gray-600">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
        {error || "Product not found."}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Edit Product</h1>
      <p className="mt-2 text-[15px] text-gray-600">{product.name}</p>
      <div className="mt-8 max-w-4xl border border-gray-200 bg-white p-6">
        <ProductForm productId={id} initialProduct={product} />
      </div>
    </div>
  );
}
