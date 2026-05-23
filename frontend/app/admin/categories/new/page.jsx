import CategoryForm from "../../_components/CategoryForm";
import { AdminFormCard, AdminPageHeader } from "../../_components/AdminUi";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add Category"
        description="Create a top-level or subcategory entry."
      />
      <AdminFormCard>
        <CategoryForm />
      </AdminFormCard>
    </div>
  );
}
