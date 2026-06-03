"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { deleteCategory, fetchAdminCategories } from "@/lib/api";
import { pillRadius } from "@/lib/ui-presets";
import { AdminTableSkeleton } from "../_components/AdminSkeletons";
import {
  AdminAlert,
  AdminConfirmDialog,
  AdminInput,
  AdminLinkButton,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTableActions,
  adminTablePaddingClass,
  adminToastError,
  adminToastSuccess,
} from "../_components/AdminUi";

const PAGE_SIZE = 25;

const LEVEL_TABS = [
  { value: "product_group", label: "Product groups" },
  { value: "category", label: "Categories" },
  { value: "subcategory", label: "Subcategories" },
];

const LEVEL_LABELS = {
  product_group: "Product group",
  category: "Category",
  subcategory: "Subcategory",
};

function getParentLabel(category) {
  const breadcrumb = category.breadcrumb || [];

  if (breadcrumb.length < 2) {
    return "—";
  }

  return breadcrumb
    .slice(0, -1)
    .map((node) => node.name)
    .join(" › ");
}

export default function AdminCategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level");
  const initialLevel = LEVEL_TABS.some((tab) => tab.value === levelParam)
    ? levelParam
    : "product_group";

  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState(initialLevel);
  const [tabCounts, setTabCounts] = useState({ product_group: 0, category: 0, subcategory: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (LEVEL_TABS.some((tab) => tab.value === levelParam)) {
      setLevel(levelParam);
    }
  }, [levelParam]);

  useEffect(() => {
    let active = true;

    Promise.all(
      LEVEL_TABS.map(async (tab) => {
        const data = await fetchAdminCategories({ level: tab.value });
        return [tab.value, data.length];
      })
    )
      .then((entries) => {
        if (!active) return;
        setTabCounts(Object.fromEntries(entries));
      })
      .catch(() => {
        if (active) setTabCounts({ product_group: 0, category: 0, subcategory: 0 });
      });

    return () => {
      active = false;
    };
  }, []);

  function changeLevel(nextLevel) {
    setLevel(nextLevel);
    router.replace(`/admin/categories?level=${nextLevel}`);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        setCategories(await fetchAdminCategories({ level }));
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [level]);

  useEffect(() => {
    setPage(1);
  }, [level, search]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      const parent = getParentLabel(category).toLowerCase();
      return (
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        parent.includes(query)
      );
    });
  }, [categories, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / PAGE_SIZE));
  const pageItems = filteredCategories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

  const activeTab = LEVEL_TABS.find((tab) => tab.value === level);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Catalog taxonomy"
        description="Manage all product groups, categories, and subcategories in the three-level Hoffmeyer catalog."
      >
        <AdminLinkButton href={`/admin/categories/new?level=${level}`}>
          + Add {activeTab?.label.replace(/s$/, "") || "item"}
        </AdminLinkButton>
      </AdminPageHeader>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {LEVEL_TABS.map((tab) => {
            const isActive = level === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => changeLevel(tab.value)}
                className={`${pillRadius} px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                  isActive
                    ? "bg-[#16568D] text-white"
                    : "border border-gray-200 bg-white text-[#333] hover:border-[#16568D]/40"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 tabular-nums ${isActive ? "text-white/85" : "text-gray-400"}`}
                >
                  ({tabCounts[tab.value] ?? "…"})
                </span>
              </button>
            );
          })}
        </div>

        <AdminInput
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${activeTab?.label.toLowerCase() || "categories"}...`}
          className="max-w-xs bg-white"
        />
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      {loading ? (
        <AdminTableSkeleton columns={6} rows={8} />
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className={adminTablePaddingClass}>
              <Table containerClassName="overflow-x-visible">
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-0">Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="pr-0 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                        No categories found.{" "}
                        <Link href="/admin/categories/new" className="font-semibold text-[#16568D] hover:underline">
                          Add a category
                        </Link>
                      </TableCell>
                    </TableRow>
                  ) : (
                    pageItems.map((category) => (
                      <TableRow key={category.id} className="hover:bg-muted/30">
                        <TableCell className="max-w-[220px] truncate py-2.5 pl-0 font-medium text-[#333]">
                          {category.name}
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate py-2.5 text-muted-foreground">
                          {category.slug}
                        </TableCell>
                        <TableCell className="py-2.5 text-muted-foreground">
                          {LEVEL_LABELS[category.level] || category.level || "—"}
                        </TableCell>
                        <TableCell className="max-w-[160px] truncate py-2.5 text-muted-foreground">
                          {getParentLabel(category)}
                        </TableCell>
                        <TableCell className="py-2.5 text-muted-foreground">{category.productsCount ?? 0}</TableCell>
                        <TableCell className="py-2.5">
                          <AdminStatusBadge active={category.isActive} />
                        </TableCell>
                        <TableCell className="py-2.5 pr-0 text-right">
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
            </div>

            {filteredCategories.length > PAGE_SIZE ? (
              <div className={`flex items-center justify-between border-t py-3 ${adminTablePaddingClass}`}>
                <p className="text-sm text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filteredCategories.length)} of {filteredCategories.length}
                </p>
                <div className="flex items-center gap-2">
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
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`border-t py-2.5 text-sm text-muted-foreground ${adminTablePaddingClass}`}>
                {filteredCategories.length} {activeTab?.label.toLowerCase() || "items"}
              </div>
            )}
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
