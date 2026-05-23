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
import { deleteCategory, fetchAdminCategories } from "@/lib/api";
import { AdminTableSkeleton } from "../_components/AdminSkeletons";
import {
  AdminAlert,
  AdminConfirmDialog,
  AdminLinkButton,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTableActions,
  AdminToolbarCard,
  adminToastError,
  adminToastSuccess,
} from "../_components/AdminUi";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCategories(await fetchAdminCategories());
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const topLevel = categories.filter((category) => !category.parentId);
  const subcategories = categories.filter((category) => category.parentId);

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);
    setError("");

    try {
      await deleteCategory(deleteTarget.id);
      setCategories((current) => current.filter((category) => category.id !== deleteTarget.id));
      adminToastSuccess("Category deleted.", `"${deleteTarget.name}" was removed from the catalog.`);
      setDeleteTarget(null);
    } catch (err) {
      const message = err.message || "Failed to delete category";
      setError(message);
      adminToastError("Could not delete category.", message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories"
        description={`${topLevel.length} top-level and ${subcategories.length} subcategories in catalog.`}
      >
        <AdminLinkButton href="/admin/categories/new">+ Add Category</AdminLinkButton>
      </AdminPageHeader>

      <AdminToolbarCard>
        <p className="text-sm text-muted-foreground">Manage top-level categories and subcategories.</p>
        <AdminLinkButton href="/admin/categories/new" variant="outline">
          + New Category
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
                  <TableHead>Type</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No categories found.{" "}
                      <Link href="/admin/categories/new" className="font-semibold text-[#16568D] hover:underline">
                        Add your first category
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium text-[#333]">{category.name}</TableCell>
                      <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.parentId ? "Subcategory" : "Top-level"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{category.productsCount ?? 0}</TableCell>
                      <TableCell>
                        <AdminStatusBadge active={category.isActive} />
                      </TableCell>
                      <TableCell className="text-right">
                        <AdminTableActions
                          editHref={`/admin/categories/${category.id}/edit`}
                          onDelete={() => setDeleteTarget({ id: category.id, name: category.name })}
                          deleting={deletingId === category.id}
                          editLabel="Edit category"
                          deleteLabel="Delete category"
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
        title="Delete category?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed from the catalog. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete category"
        onConfirm={confirmDelete}
        loading={Boolean(deletingId)}
      />
    </div>
  );
}
