import { Suspense } from "react";
import CategoryForm from "../../_components/CategoryForm";
import { AdminFormCard, AdminPageHeader } from "../../_components/AdminUi";
import { AdminFormSkeleton } from "../../_components/AdminSkeletons";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add catalog item"
        description="Create a product group, category, or subcategory in the three-level taxonomy."
      />
      <AdminFormCard>
        <Suspense fallback={<AdminFormSkeleton fields={7} />}>
          <CategoryForm />
        </Suspense>
      </AdminFormCard>
    </div>
  );
}
