import CategoryForm from "../../_components/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Add Category</h1>
      <p className="mt-2 text-[15px] text-gray-600">Create a top-level or subcategory entry.</p>
      <div className="mt-8 max-w-3xl border border-gray-200 bg-white p-6">
        <CategoryForm />
      </div>
    </div>
  );
}
