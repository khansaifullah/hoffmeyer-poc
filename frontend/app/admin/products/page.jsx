"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setProducts(await fetchProducts());
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Products</h1>
      <p className="mt-2 text-[15px] text-gray-600">Static view of products from the database.</p>

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
              <th className="px-4 py-3 font-semibold">SKU</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#333]">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.category?.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{product.sku || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={product.in_stock ? "text-green-600" : "text-red-600"}>
                      {product.in_stock ? "In stock" : "Out of stock"}
                    </span>
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
