"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBrand, fetchAdminBrands } from "@/lib/api";
import { AdminTableSkeleton } from "../_components/AdminSkeletons";
import {
  AdminAlert,
  AdminConfirmDialog,
  AdminLinkButton,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTableActions,
  AdminToolbarCard,
  AdminYesBadge,
  adminToastError,
  adminToastSuccess,
} from "../_components/AdminUi";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);
    setError("");

    try {
      await deleteBrand(deleteTarget.id);
      setBrands((current) => current.filter((brand) => brand.id !== deleteTarget.id));
      adminToastSuccess("Brand deleted.", `"${deleteTarget.name}" was removed from the catalog.`);
      setDeleteTarget(null);
    } catch (err) {
      const message = err.message || "Failed to delete brand";
      setError(message);
      adminToastError("Could not delete brand.", message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Brands" description={`${brands.length} brands in catalog.`}>
        <AdminLinkButton href="/admin/brands/new">+ Add Brand</AdminLinkButton>
      </AdminPageHeader>

      <AdminToolbarCard>
        <p className="text-sm text-muted-foreground">Manage manufacturer brands and logos.</p>
        <AdminLinkButton href="/admin/brands/new" variant="outline">
          + New Brand
        </AdminLinkButton>
      </AdminToolbarCard>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      {loading ? (
        <AdminTableSkeleton columns={6} rows={8} />
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No brands found.{" "}
                      <Link href="/admin/brands/new" className="font-semibold text-[#16568D] hover:underline">
                        Add your first brand
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  brands.map((brand) => (
                    <TableRow key={brand.id}>
                      <TableCell className="font-medium text-[#333]">{brand.name}</TableCell>
                      <TableCell className="text-muted-foreground">{brand.slug}</TableCell>
                      <TableCell className="text-muted-foreground">{brand.productsCount ?? 0}</TableCell>
                      <TableCell>
                        <AdminYesBadge value={brand.isFeatured} />
                      </TableCell>
                      <TableCell>
                        <AdminStatusBadge active={brand.isActive} />
                      </TableCell>
                      <TableCell className="text-right">
                        <AdminTableActions
                          editHref={`/admin/brands/${brand.id}/edit`}
                          onDelete={() => setDeleteTarget({ id: brand.id, name: brand.name })}
                          deleting={deletingId === brand.id}
                          editLabel="Edit brand"
                          deleteLabel="Delete brand"
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

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open && !deletingId) setDeleteTarget(null);
        }}
        title="Delete brand?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed from the catalog. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete brand"
        onConfirm={confirmDelete}
        loading={Boolean(deletingId)}
      />
    </div>
  );
}
