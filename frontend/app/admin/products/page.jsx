"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteProduct, fetchAdminProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchAdminProducts({
          page,
          per_page: 25,
          search: search.trim() || undefined,
        });
        setProducts(result.products);
        setMeta(result.meta);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, search]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    setDeletingId(id);
    setError("");

    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#333]">Products</h1>
          <p className="mt-2 text-[15px] text-gray-600">
            {meta?.total ?? products.length} products in catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center bg-[#16568D] px-5 text-[14px] font-bold text-white hover:bg-[#124570]"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder="Search products..."
          className="h-11 w-full max-w-md border border-gray-300 px-3 text-[15px] outline-none focus:border-[#004b87]"
        />
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
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Brand</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Availability</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#333]">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.categoryName || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{product.brand?.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.availabilityStatus?.replace("_", " ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="font-semibold text-[#16568D] hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
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

      {meta && meta.last_page > 1 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="border border-gray-300 px-3 py-2 text-[13px] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[13px] text-gray-600">
            Page {meta.current_page} of {meta.last_page}
          </span>
          <button
            type="button"
            disabled={page >= meta.last_page}
            onClick={() => setPage((current) => current + 1)}
            className="border border-gray-300 px-3 py-2 text-[13px] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
