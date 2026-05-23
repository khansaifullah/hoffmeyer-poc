"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getStoredUser, logout } from "@/lib/auth";
import { AdminConfirmDialog } from "./AdminUi";
import { Toaster } from "@/components/ui/sonner";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "Categories",
    addHref: "/admin/categories/new",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/brands",
    label: "Brands",
    addHref: "/admin/brands/new",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    addHref: "/admin/products/new",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  async function confirmLogout() {
    setLoggingOut(true);

    try {
      await logout();
      router.push("/login");
    } finally {
      setLoggingOut(false);
      setLogoutOpen(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#16568D] text-white shadow-lg">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/images/brand/logo.png"
              alt="Hoffmeyer"
              className="h-8 object-contain brightness-0 invert"
            />
          </Link>
          <Badge variant="secondary" className="mt-3 bg-white/10 text-[10px] uppercase tracking-[0.18em] text-white/80">
            Admin Panel
          </Badge>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-white/50">Catalog</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold transition-colors ${
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className={active ? "text-white" : "text-white/60"}>{item.icon}</span>
                      {item.label}
                    </Link>
                    {item.addHref && (
                      <Link
                        href={item.addHref}
                        title={`Add ${item.label.slice(0, -1)}`}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-transparent text-[18px] font-bold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        +
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          {user ? (
            <div className="mb-3 px-2">
              <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
              <p className="truncate text-[12px] text-white/60">{user.email}</p>
            </div>
          ) : (
            <div className="mb-3 space-y-2 px-2">
              <Skeleton className="h-4 w-28 bg-white/15" />
              <Skeleton className="h-3 w-36 bg-white/10" />
            </div>
          )}
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mb-2 h-10 w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            View Storefront
          </Link>
          <Button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="h-10 w-full bg-white/10 text-white hover:bg-white/20"
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className="ml-64 min-h-screen">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-8 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">Hoffmeyer B2B Catalog Management</p>
            {user ? (
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-semibold text-[#004b87]">{user.name}</span>
              </p>
            ) : (
              <Skeleton className="h-4 w-40" />
            )}
          </div>
        </header>

        <main className="px-8 py-8">{children}</main>
      </div>

      <AdminConfirmDialog
        open={logoutOpen}
        onOpenChange={(open) => {
          if (!loggingOut) setLogoutOpen(open);
        }}
        title="Log out?"
        description="You will be signed out of the admin panel and returned to the login page."
        confirmLabel="Log out"
        cancelLabel="Stay signed in"
        onConfirm={confirmLogout}
        loading={loggingOut}
        variant="default"
      />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
