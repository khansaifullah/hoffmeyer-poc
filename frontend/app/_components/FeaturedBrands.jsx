import Link from "next/link";
import SectionHeading from "./SectionHeading";
import BrandLogo from "./BrandLogo";
import { defaultBrandNames, getBrandsByNames } from "@/lib/brands";
import { getSlug } from "@/lib/slug";

export default function FeaturedBrands({
  titleAccent = "Featured",
  titleRest = "Brands",
  categorySlug = "bearings",
  showViewAll = true,
}) {
  const featuredBrands = getBrandsByNames(defaultBrandNames);

  return (
    <section className="bg-[#f2f2f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading accent={titleAccent} rest={titleRest} />

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.name}
              href={`/category/${categorySlug}/brand/${getSlug(brand.name)}`}
              className="flex h-24 items-center justify-center border border-gray-200 bg-white px-4 transition-colors hover:border-[#16568D] md:h-28"
            >
              <BrandLogo brand={brand} size="lg" />
            </Link>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-8 flex justify-center">
            <Link
              href={`/category/${categorySlug}`}
              className="border border-[#16568D] bg-white px-8 py-2.5 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white"
            >
              View All Brands
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export { getBrandsByNames };
