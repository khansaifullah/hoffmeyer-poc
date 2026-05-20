import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { getCategoryLabel, getSubcategories, getSubcategoryHref } from "@/lib/category-content";
import { getSlug } from "@/lib/slug";

export default function CategorySubcategories({
  slug,
  brandSlug = null,
  titleAccent = null,
  titleRest = "by Category",
}) {
  const subcategories = getSubcategories(slug);
  const accent = titleAccent || getCategoryLabel(slug);

  return (
    <section className="bg-white px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading accent={accent} rest={titleRest} />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
          {subcategories.map((item, index) => (
            <Link
              key={index}
              href={getSubcategoryHref(slug, getSlug(item.name), brandSlug)}
              className="group flex flex-col border border-gray-200 bg-white transition-colors hover:border-[#16568D]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-[#fafafa] p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="border-t border-gray-100 px-3 py-3 text-center text-[13px] font-semibold leading-snug text-[#333] group-hover:text-[#004b87] md:text-[14px]">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
