"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteBrand, fetchAdminBrands } from "@/lib/api";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setBrands(await fetchAdminBrands());
      } catch (err) {
        setError(err.message || "Failed to load brands");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this brand?")) return;

    setDeletingId(id);
    setError("");

    try {
      await deleteBrand(id);
      setBrands((current) => current.filter((brand) => brand.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete brand");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#333]">Brands</h1>
          <p className="mt-2 text-[15px] text-gray-600">{brands.length} brands in catalog.</p>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex h-11 shrink-0 items-center justify-center bg-[#16568D] px-5 text-[14px] font-bold text-white hover:bg-[#124570]"
        >
          + Add Brand
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border border-gray-200 bg-white px-4 py-3">
        <p className="text-[14px] text-gray-600">Manage manufacturer brands and logos.</p>
        <Link
          href="/admin/brands/new"
          className="inline-flex h-10 items-center justify-center border border-[#16568D] bg-white px-4 text-[13px] font-bold text-[#16568D] hover:bg-[#16568D]/5"
        >
          + New Brand
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto border border-gray-200 bg-white">
        <table className="min-w-full text-left text-[14px]">
          <thead className="border-b border-gray-200 bg-gray-50 text-[12px] uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Products</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading brands...
                </td>
              </tr>
            ) : brands.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No brands found.{" "}
                  <Link href="/admin/brands/new" className="font-semibold text-[#16568D] hover:underline">
                    Add your first brand
                  </Link>
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#333]">{brand.name}</td>
                  <td className="px-4 py-3 text-gray-600">{brand.slug}</td>
                  <td className="px-4 py-3 text-gray-600">{brand.productsCount ?? 0}</td>
                  <td className="px-4 py-3 text-gray-600">{brand.isFeatured ? "Yes" : "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{brand.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/brands/${brand.id}/edit`}
                        className="font-semibold text-[#16568D] hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(brand.id)}
                        disabled={deletingId === brand.id}
                        className="font-semibold text-red-600 hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
