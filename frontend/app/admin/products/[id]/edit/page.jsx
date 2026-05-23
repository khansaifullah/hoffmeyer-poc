"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "../../../_components/ProductForm";
import { fetchAdminProduct } from "@/lib/api";
import { AdminEditPageSkeleton } from "../../../_components/AdminSkeletons";
import { AdminAlert, AdminFormCard, AdminPageHeader } from "../../../_components/AdminUi";

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
    return <AdminEditPageSkeleton fields={8} />;
  }

  if (error || !product) {
    return <AdminAlert>{error || "Product not found."}</AdminAlert>;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Edit Product" description={product.name} />
      <AdminFormCard className="max-w-5xl">
        <ProductForm productId={id} initialProduct={product} />
      </AdminFormCard>
    </div>
  );
}
