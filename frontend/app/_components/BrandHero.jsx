import Breadcrumbs from "./Breadcrumbs";
import BrandLogo from "./BrandLogo";
import { getCategoryName } from "@/lib/categories";

export default function BrandHero({ brand, categorySlug }) {
  const categoryName = getCategoryName(categorySlug);

  return (
    <section className="bg-[#40A8F3] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Categories", href: "/#categories" },
                {
                  label: categoryName,
                  href: `/category/${categorySlug}`,
                  className: "capitalize",
                },
                { label: brand.name },
              ]}
            />

            <h1 className="text-[32px] font-extrabold uppercase leading-tight md:text-[44px]">
              {brand.name}
            </h1>
            <p className="mt-3 max-w-3xl text-[16px] text-white/85 md:text-[18px]">
              {brand.description}
            </p>
          </div>

          <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-sm border border-white/30 bg-white px-8 md:h-32 md:w-52">
            <BrandLogo brand={brand} size="lg" className="max-h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
