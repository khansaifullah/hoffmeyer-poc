import BrandForm from "../../_components/BrandForm";
import { AdminFormCard, AdminPageHeader } from "../../_components/AdminUi";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Add Brand" description="Create a new manufacturer brand." />
      <AdminFormCard>
        <BrandForm />
      </AdminFormCard>
    </div>
  );
}
