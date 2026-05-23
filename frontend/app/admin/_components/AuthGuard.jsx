"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getToken } from "@/lib/auth";
import { AdminShellSkeleton } from "./AdminSkeletons";

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
    return <AdminShellSkeleton />;
  }

  return children;
}
