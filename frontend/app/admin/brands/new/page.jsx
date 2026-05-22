import BrandForm from "../../_components/BrandForm";

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold text-[#333]">Add Brand</h1>
      <p className="mt-2 text-[15px] text-gray-600">Create a new manufacturer brand.</p>
      <div className="mt-8 max-w-3xl border border-gray-200 bg-white p-6">
        <BrandForm />
      </div>
    </div>
  );
}
