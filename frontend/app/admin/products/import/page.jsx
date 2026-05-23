"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { importProducts } from "@/lib/api";
import {
  AdminAlert,
  AdminFormActions,
  AdminLinkButton,
  AdminOutlineButton,
  AdminPageHeader,
  AdminPrimaryButton,
} from "../../_components/AdminUi";

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Import Products"
        description="Upload a CSV to create or update catalog products in bulk."
      >
        <AdminLinkButton href="/admin/products" variant="ghost">
          Back to Products
        </AdminLinkButton>
      </AdminPageHeader>

      {result ? (
        <Card
          ref={successRef}
          className={
            importSucceeded
              ? "border-green-200 bg-green-50 shadow-sm"
              : result.failed > 0
                ? "border-amber-200 bg-amber-50 shadow-sm"
                : "shadow-sm"
          }
        >
          <CardContent className="space-y-4 py-6">
            {importSucceeded ? (
              <>
                <p className="text-xl font-bold text-[#145c3a]">Import complete</p>
                <p className="text-sm text-[#145c3a]">
                  {result.created > 0 && `${result.created} product${result.created === 1 ? "" : "s"} created`}
                  {result.created > 0 && result.updated > 0 && ", "}
                  {result.updated > 0 && `${result.updated} product${result.updated === 1 ? "" : "s"} updated`}
                  .
                </p>
                <AdminFormActions>
                  <AdminLinkButton href="/admin/products">View Products</AdminLinkButton>
                  <AdminOutlineButton type="button" onClick={resetImport}>
                    Import Another File
                  </AdminOutlineButton>
                </AdminFormActions>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-[#333]">Import finished with issues</p>
                <p className="text-sm text-gray-700">
                  Created {result.created}, updated {result.updated}, failed {result.failed}.
                </p>
                {result.errors?.length > 0 ? (
                  <ul className="space-y-1 text-sm text-destructive">
                    {result.errors.map((entry) => (
                      <li key={`${entry.row}-${entry.message}`}>
                        Row {entry.row}: {entry.message}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      ) : null}

      <Card className="max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle>CSV format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-[#333]">Required columns</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">name</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">category_slug</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">price</code>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#333]">Optional columns</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              slug, brand_slug, sku, item_number, mfr_number, material, description, in_stock,
              availability_status, is_featured, sort_order, image
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Rows with a matching slug or sku will update existing products. All other rows create new products.
          </p>

          <Button type="button" variant="link" onClick={downloadSample} className="h-auto p-0 text-[#16568D]">
            Download sample CSV
          </Button>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm font-semibold text-[#333]">Upload CSV file</p>

            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-[#fafafa] p-8 text-center">
              {loading ? (
                <div className="mx-auto max-w-sm space-y-3">
                  <Skeleton className="mx-auto h-4 w-40" />
                  <Skeleton className="mx-auto h-3 w-56" />
                  <Skeleton className="mx-auto h-10 w-44" />
                </div>
              ) : (
                <>
                  <p className="text-base font-medium text-[#333]">
                    {file ? file.name : "No file selected"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">Choose a .csv file from your computer</p>
                  <label className="mt-5 inline-flex cursor-pointer">
                    <span className="inline-flex h-10 items-center justify-center rounded-lg bg-[#16568D] px-5 text-sm font-semibold text-white hover:bg-[#124570]">
                      Choose CSV File
                    </span>
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
                </>
              )}
            </div>

            {error ? <AdminAlert>{error}</AdminAlert> : null}

            <AdminPrimaryButton type="submit" disabled={loading || !file}>
              {loading ? "Importing..." : "Import CSV"}
            </AdminPrimaryButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
