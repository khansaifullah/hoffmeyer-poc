"use client";

import { useEffect, useState } from "react";
import BrandForm from "../../../_components/BrandForm";
import { fetchAdminBrand } from "@/lib/api";
import { AdminEditPageSkeleton } from "../../../_components/AdminSkeletons";
import { AdminAlert, AdminFormCard, AdminPageHeader } from "../../../_components/AdminUi";

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
    return <AdminEditPageSkeleton fields={6} />;
  }

  if (error || !brand) {
    return <AdminAlert>{error || "Brand not found."}</AdminAlert>;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Edit Brand" description={brand.name} />
      <AdminFormCard>
        <BrandForm brandId={brandId} initialBrand={brand} />
      </AdminFormCard>
    </div>
  );
}
