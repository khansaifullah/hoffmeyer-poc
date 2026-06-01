import Link from "next/link";
import { getCategoryHref } from "@/lib/catalog-urls";

export default function ProductGroupCategoryTile({ category, group, className = "" }) {
  return (
    <Link
      href={getCategoryHref(category)}
      className={`group flex min-h-[132px] flex-col items-center justify-between rounded-xl border border-[#e8eef3] bg-[#f8fbfd] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#16568D] hover:bg-[#eef5fb] hover:shadow-sm ${className}`}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-1 py-1">
        <img
          src={category.image || group.image || "/images/products/bearing.png"}
          alt={category.name}
          className="max-h-[72px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 line-clamp-2 text-center text-[12px] font-semibold leading-snug text-[#1f2937] group-hover:text-[#004b87] md:text-[13px]">
        {category.name}
      </p>
    </Link>
  );
}
