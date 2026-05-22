"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredUser, logout } from "@/lib/auth";

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
  {
    href: "/admin/products/import",
    label: "Import CSV",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#16568D] text-white shadow-lg">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/images/brand/logo.png"
              alt="Hoffmeyer"
              className="h-8 brightness-0 invert object-contain"
            />
          </Link>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-white/50">
            Catalog
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

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
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 text-[18px] font-bold text-white/90 transition-colors hover:bg-white/10"
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
          {user && (
            <div className="mb-3 px-2">
              <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
              <p className="truncate text-[12px] text-white/60">{user.email}</p>
            </div>
          )}
          <Link
            href="/"
            className="mb-2 flex w-full items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[13px] font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            View Storefront
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="ml-64 min-h-screen">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-gray-500">
              Hoffmeyer B2B Catalog Management
            </p>
            {user && (
              <p className="text-[13px] text-gray-600">
                Signed in as <span className="font-semibold text-[#004b87]">{user.name}</span>
              </p>
            )}
          </div>
        </header>

        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
