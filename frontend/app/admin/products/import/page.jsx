"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { importProducts } from "@/lib/api";

const SAMPLE_CSV = `name,category_slug,brand_slug,price,sku,item_number,mfr_number,material,description,in_stock,availability_status,is_featured,sort_order,image
Sample Industrial Product,bearings,dodge,129.99,HOFF-SAMPLE-001,9000001,SMP001,Synthetic,Sample imported product for catalog testing,true,in_stock,false,0,/images/products/bearing.png`;

export default function ImportProductsPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const successRef = useRef(null);

  const importSucceeded =
    result && result.failed === 0 && result.created + result.updated > 0;

  useEffect(() => {
    if (result) {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError("Choose a CSV file to import.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      setResult(await importProducts(file));
    } catch (err) {
      setError(err.message || "Import failed");
    } finally {
      setLoading(false);
    }
  }

  function downloadSample() {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product-import-sample.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetImport() {
    setFile(null);
    setResult(null);
    setError("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#333]">Import Products</h1>
          <p className="mt-2 text-[15px] text-gray-600">
            Upload a CSV to create or update catalog products in bulk.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex h-11 items-center justify-center border border-gray-300 bg-white px-5 text-[14px] font-bold text-[#333] hover:bg-gray-50"
        >
          Back to Products
        </Link>
      </div>

      {result && (
        <div
          ref={successRef}
          className={`mt-6 border-2 p-6 ${
            importSucceeded
              ? "border-[#22a06b] bg-[#edfdf4]"
              : result.failed > 0
                ? "border-amber-400 bg-amber-50"
                : "border-gray-300 bg-gray-50"
          }`}
        >
          {importSucceeded ? (
            <>
              <p className="text-[20px] font-bold text-[#145c3a]">Import complete</p>
              <p className="mt-2 text-[15px] text-[#145c3a]">
                {result.created > 0 && `${result.created} product${result.created === 1 ? "" : "s"} created`}
                {result.created > 0 && result.updated > 0 && ", "}
                {result.updated > 0 && `${result.updated} product${result.updated === 1 ? "" : "s"} updated`}
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/admin/products"
                  className="inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570]"
                >
                  View Products
                </Link>
                <button
                  type="button"
                  onClick={resetImport}
                  className="inline-flex h-11 items-center justify-center border border-[#16568D] bg-white px-6 text-[14px] font-bold text-[#16568D] hover:bg-[#16568D]/5"
                >
                  Import Another File
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[18px] font-bold text-[#333]">Import finished with issues</p>
              <p className="mt-2 text-[15px] text-gray-700">
                Created {result.created}, updated {result.updated}, failed {result.failed}.
              </p>
              {result.errors?.length > 0 && (
                <ul className="mt-3 space-y-1 text-[14px] text-red-700">
                  {result.errors.map((entry) => (
                    <li key={`${entry.row}-${entry.message}`}>
                      Row {entry.row}: {entry.message}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}

      <div className="mt-6 max-w-3xl border border-gray-200 bg-white p-6">
        <p className="text-[14px] font-semibold text-[#333]">Required columns</p>
        <p className="mt-2 text-[14px] text-gray-600">
          <code className="text-[13px]">name</code>, <code className="text-[13px]">category_slug</code>,{" "}
          <code className="text-[13px]">price</code>
        </p>

        <p className="mt-4 text-[14px] font-semibold text-[#333]">Optional columns</p>
        <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
          slug, brand_slug, sku, item_number, mfr_number, material, description, in_stock,
          availability_status, is_featured, sort_order, image
        </p>

        <p className="mt-4 text-[14px] text-gray-600">
          First row must be a header with at least{" "}
          <code className="text-[13px]">name</code>, <code className="text-[13px]">category_slug</code>, and{" "}
          <code className="text-[13px]">price</code>. Comma or semicolon separators are supported.
        </p>

        <p className="mt-2 text-[14px] text-gray-600">
          Rows with a matching <code className="text-[13px]">slug</code> or <code className="text-[13px]">sku</code>{" "}
          will update existing products. All other rows create new products.
        </p>

        <button
          type="button"
          onClick={downloadSample}
          className="mt-4 text-[14px] font-semibold text-[#16568D] hover:underline"
        >
          Download sample CSV
        </button>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t border-gray-200 pt-6">
          <p className="text-[14px] font-semibold text-[#333]">Upload CSV file</p>

          <div className="rounded border-2 border-dashed border-gray-300 bg-[#fafafa] p-8 text-center">
            <p className="text-[15px] font-medium text-[#333]">
              {file ? file.name : "No file selected"}
            </p>
            <p className="mt-2 text-[13px] text-gray-500">Choose a .csv file from your computer</p>
            <label className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570]">
              Choose CSV File
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={(event) => {
                  setFile(event.target.files?.[0] || null);
                  setResult(null);
                  setError("");
                }}
                className="sr-only"
              />
            </label>
          </div>

          {error && (
            <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="h-11 bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] disabled:opacity-50"
          >
            {loading ? "Importing..." : "Import CSV"}
          </button>
        </form>
      </div>
    </div>
  );
}
