import Link from "next/link";
import SectionHeading from "./SectionHeading";
import BrandLogo from "./BrandLogo";
import { cardRadius, buttonRadius } from "@/lib/ui-presets";

export default function ShopByBrand({ categorySlug, categoryName, brands = [] }) {
  if (brands.length === 0) {
    return null;
  }

  const label = categoryName.toUpperCase();

  return (
    <section className="bg-[#f2f2f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading accent="Shop" rest={`${label} by Brand`} />

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/category/${categorySlug}/brand/${brand.slug}`}
              className={`flex h-24 items-center justify-center ${cardRadius} border border-gray-200 bg-white px-4 transition-colors hover:border-[#16568D] md:h-28`}
            >
              <BrandLogo brand={brand} size="lg" />
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/category/${categorySlug}`}
            className={`border border-[#16568D] bg-white px-8 py-2.5 ${buttonRadius} text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white`}
          >
            View All Brands
          </Link>
        </div>
      </div>
    </section>
  );
}
