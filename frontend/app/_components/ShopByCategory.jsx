import Link from "next/link";
import { categories as defaultCategories } from "@/lib/categories";
import { getSlug } from "@/lib/slug";

export default function ShopByCategory({
  title = "Shop by Category",
  categories = defaultCategories,
  currentSlug = null,
  showViewAll = true,
}) {
  return (
    <section id="categories" className="bg-[#fcfcfc] px-4 py-12 md:px-0 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <h2 className="mb-8 text-center text-[26px] font-bold text-[#004b87] md:mb-12 md:text-[32px]">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:px-14">
          {categories.map((cat, index) => {
            const slug = getSlug(cat.name);
            const isActive = currentSlug === slug;

            return (
              <Link
                href={`/category/${slug}`}
                key={index}
                className={`group flex aspect-square cursor-pointer flex-col items-center justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300 md:rounded-xl ${
                  isActive
                    ? "border-[#16568D] bg-[#16568D]/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-[#16568D] hover:shadow-lg"
                }`}
              >
                <div className="flex min-h-0 w-full flex-1 items-center justify-center p-2">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p
                  className={`flex h-[40px] items-center justify-center whitespace-pre-wrap text-center text-[14px] font-semibold leading-tight transition-colors duration-200 md:h-[36px] md:text-[13px] md:font-bold ${
                    isActive ? "text-[#16568D]" : "text-gray-800 group-hover:text-[#16568D]"
                  }`}
                >
                  {cat.name}
                </p>
              </Link>
            );
          })}
        </div>

        {showViewAll && (
          <div className="mt-8 flex justify-center md:mt-12">
            <Link
              href="/#categories"
              className="rounded-lg bg-[#16568D] px-6 py-3.5 text-[18px] font-semibold text-white shadow-sm transition-all hover:bg-[#124570] active:scale-[0.98] md:rounded-md md:border md:border-[#16568D] md:bg-white md:px-8 md:py-2.5 md:text-[15px] md:font-bold md:text-[#16568D] md:hover:bg-gray-50"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
