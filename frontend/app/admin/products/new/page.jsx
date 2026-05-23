import ProductForm from "../../_components/ProductForm";
import { AdminFormCard, AdminPageHeader } from "../../_components/AdminUi";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Add Product" description="Create a new catalog product." />
      <AdminFormCard className="max-w-5xl">
        <ProductForm />
      </AdminFormCard>
    </div>
  );
}
