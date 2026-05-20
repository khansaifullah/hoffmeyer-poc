"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getToken } from "@/lib/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!getToken()) {
        router.replace("/login");
        return;
      }

      try {
        await getCurrentUser();
        setReady(true);
      } catch {
        router.replace("/login");
      }
    }

    verify();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] text-[14px] text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return children;
}
