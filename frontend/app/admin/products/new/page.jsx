import ProductForm from "../../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Add Product</h1>
      <p className="mt-2 text-[15px] text-gray-600">Create a new catalog product.</p>
      <div className="mt-8 max-w-4xl border border-gray-200 bg-white p-6">
        <ProductForm />
      </div>
    </div>
  );
}
