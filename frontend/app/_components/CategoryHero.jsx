import Breadcrumbs from "./Breadcrumbs";

export default function CategoryHero({ category, description }) {
  const categoryName = category.name;
  const heroDescription =
    description ||
    category.heroDescription ||
    `Browse ${categoryName} products, trusted brands, and top sellers for your operation.`;

  return (
    <section className="bg-[#40A8F3] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/#categories" },
            { label: categoryName, className: "capitalize" },
          ]}
        />

        <h1 className="text-[32px] font-extrabold capitalize leading-tight md:text-[44px]">
          {categoryName}
        </h1>
        <p className="mt-3 max-w-3xl text-[16px] text-white/85 md:text-[18px]">
          {heroDescription}
        </p>
      </div>
    </section>
  );
}
