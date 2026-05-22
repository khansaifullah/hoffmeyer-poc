import Breadcrumbs from "./Breadcrumbs";

export default function ListingHero({
  categorySlug,
  categoryName,
  title,
  description,
  brandName = null,
  brandSlug = null,
}) {
  const parentName = categoryName || categorySlug.replace(/-/g, " ");
  const displayTitle = title || parentName;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/#categories" },
    {
      label: parentName,
      href: `/category/${categorySlug}`,
      className: "capitalize",
    },
  ];

  if (brandName && brandSlug) {
    breadcrumbItems.push({
      label: brandName,
      href: `/category/${categorySlug}/brand/${brandSlug}`,
    });
  }

  breadcrumbItems.push({ label: displayTitle });

  return (
    <section className="bg-[#40A8F3] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="relative inline-block pb-2 text-[28px] font-black uppercase leading-tight md:text-[36px]">
          {displayTitle}
          <span className="absolute bottom-0 left-0 h-[3px] w-16 bg-white/90" />
        </h1>

        <p className="mt-4 max-w-4xl text-[14px] leading-relaxed text-white/85 md:text-[15px]">
          {description ||
            `Shop ${displayTitle.toLowerCase()} for industrial applications. Hoffmeyer supplies reliable components with fast fulfillment for maintenance and MRO teams.`}
          {" "}
          <button type="button" className="font-semibold text-white underline underline-offset-2 hover:text-white/90">
            Read more
          </button>
        </p>
      </div>
    </section>
  );
}
