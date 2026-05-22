"use client";

import { useEffect, useState } from "react";
import BrandForm from "../../../_components/BrandForm";
import { fetchAdminBrand } from "@/lib/api";

export default function EditBrandPage({ params }) {
  const [brandId, setBrandId] = useState(null);
  const [brand, setBrand] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resolved = await params;
        const id = resolved.id;
        setBrandId(id);
        setBrand(await fetchAdminBrand(id));
      } catch (err) {
        setError(err.message || "Failed to load brand");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params]);

  if (loading) {
    return <p className="text-[15px] text-gray-600">Loading brand...</p>;
  }

  if (error || !brand) {
    return (
      <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
        {error || "Brand not found."}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Edit Brand</h1>
      <p className="mt-2 text-[15px] text-gray-600">{brand.name}</p>
      <div className="mt-8 max-w-3xl border border-gray-200 bg-white p-6">
        <BrandForm brandId={brandId} initialBrand={brand} />
      </div>
    </div>
  );
}
