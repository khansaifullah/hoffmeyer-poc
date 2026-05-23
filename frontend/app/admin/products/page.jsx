"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, fetchAdminProducts } from "@/lib/api";
import { AdminTableSkeleton } from "../_components/AdminSkeletons";
import {
  AdminAlert,
  AdminConfirmDialog,
  AdminInput,
  AdminLinkButton,
  AdminPageHeader,
  AdminTableActions,
  AdminToolbarCard,
  adminToastError,
  adminToastSuccess,
} from "../_components/AdminUi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);
    setError("");

    try {
      await deleteProduct(deleteTarget.id);
      setProducts((current) => current.filter((product) => product.id !== deleteTarget.id));
      adminToastSuccess("Product deleted.", `"${deleteTarget.name}" was removed from the catalog.`);
      setDeleteTarget(null);
    } catch (err) {
      const message = err.message || "Failed to delete product";
      setError(message);
      adminToastError("Could not delete product.", message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        description={`${meta?.total ?? products.length} products in catalog.`}
      >
        <AdminLinkButton href="/admin/products/new">+ Add Product</AdminLinkButton>
        <AdminLinkButton href="/admin/products/import" variant="outline">
          Import CSV
        </AdminLinkButton>
      </AdminPageHeader>

      <AdminToolbarCard>
        <AdminInput
          type="text"
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder="Search products..."
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <AdminLinkButton href="/admin/products/new" variant="outline">
            + New Product
          </AdminLinkButton>
          <AdminLinkButton href="/admin/products/import">Import CSV</AdminLinkButton>
        </div>
      </AdminToolbarCard>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      {loading ? (
        <AdminTableSkeleton columns={6} rows={10} />
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No products found.{" "}
                      <Link href="/admin/products/new" className="font-semibold text-[#16568D] hover:underline">
                        Add your first product
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="max-w-xs font-medium text-[#333]">
                        <span className="line-clamp-2">{product.name}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.categoryName || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{product.brand?.name || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">${Number(product.price).toFixed(2)}</TableCell>
                      <TableCell className="capitalize text-muted-foreground">
                        {product.availabilityStatus?.replace("_", " ") || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <AdminTableActions
                          editHref={`/admin/products/${product.id}/edit`}
                          onDelete={() => setDeleteTarget({ id: product.id, name: product.name })}
                          deleting={deletingId === product.id}
                          editLabel="Edit product"
                          deleteLabel="Delete product"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {meta && meta.last_page > 1 && (
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {meta.current_page} of {meta.last_page}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= meta.last_page}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open && !deletingId) setDeleteTarget(null);
        }}
        title="Delete product?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed from the catalog. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete product"
        onConfirm={confirmDelete}
        loading={Boolean(deletingId)}
      />
    </div>
  );
}
