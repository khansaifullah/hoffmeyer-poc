"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@hoffmeyer.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <img src="/images/brand/logo.png" alt="Hoffmeyer" className="mx-auto h-10 object-contain" />
        <h1 className="mt-4 text-[24px] font-bold text-[#004b87]">Admin Sign In</h1>
        <p className="mt-2 text-[14px] text-gray-500">Sign in to manage catalog data</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] text-gray-900 outline-none focus:border-[#004b87]"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="h-11 w-full border border-gray-300 bg-white px-3 text-[15px] text-gray-900 outline-none focus:border-[#004b87]"
          />
        </div>

        {error && (
          <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[14px] text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-[#004b87] text-[15px] font-bold text-white transition-colors hover:bg-[#003a63] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-gray-500">
        <Link href="/" className="text-[#004b87] hover:underline">
          Back to storefront
        </Link>
      </p>
    </div>
  );
}
