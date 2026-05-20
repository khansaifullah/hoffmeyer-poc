import { defaultBrandNames, getBrandsByNames } from "@/lib/brands";

export default function FeaturedBrands({ title = "Shop by Brand" }) {
  const featuredBrands = getBrandsByNames(defaultBrandNames);

  return (
    <section className="w-full bg-[#f2f2f2] px-4 py-10 md:px-0 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <h2 className="mb-8 text-center text-[26px] font-bold text-[#004b87] md:mb-12 md:text-[32px]">
          {title}
        </h2>

        <div className="grid grid-cols-3 items-center gap-x-6 gap-y-8 md:grid-cols-6 md:gap-x-12 md:gap-y-16">
          {featuredBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-16 cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              {brand.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { getBrandsByNames };
