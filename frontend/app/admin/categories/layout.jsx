import { Suspense } from "react";
import { AdminTableSkeleton } from "../_components/AdminSkeletons";

export default function AdminCategoriesLayout({ children }) {
  return <Suspense fallback={<AdminTableSkeleton columns={6} rows={8} />}>{children}</Suspense>;
}
