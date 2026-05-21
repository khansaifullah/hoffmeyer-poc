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

        <div className="mt-8 flex flex-wrap gap-3">
          {subcategories.map((item, index) => (
            <Link
              key={index}
              href={getSubcategoryHref(slug, getSlug(item.name), brandSlug)}
              className="group inline-flex h-14 max-w-full items-center gap-3 rounded-lg border border-gray-200 bg-white pr-4 transition-colors hover:border-[#16568D] md:h-16 md:pr-5"
            >
              <div className="flex h-full w-14 shrink-0 items-center justify-center rounded-l-[7px] border-r border-gray-100 bg-[#fafafa] p-2 md:w-16">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-[12px] font-semibold leading-snug text-[#333] group-hover:text-[#004b87] md:text-[13px]">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
