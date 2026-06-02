import Link from "next/link";
import PlaceholderImage from "@/app/_components/PlaceholderImage";
import ProductGroupCategoryTile from "@/app/_components/ProductGroupCategoryTile";
import { getMidCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";

function CategoryBlock({ group, category }) {
  const subcategories = category.children || [];
  const categoryHref = getMidCategoryHref(group.slug, category.slug);

  if (subcategories.length === 0) {
    return (
      <article>
        <Link
          href={categoryHref}
          className="group inline-flex items-center gap-3 rounded-lg py-1 hover:opacity-90"
        >
          <PlaceholderImage
            src={category.image}
            alt=""
            className="h-9 w-9 shrink-0 object-contain"
            aria-hidden="true"
          />
          <h3 className="border-l-4 border-[#16568D] pl-3 text-[15px] font-bold uppercase tracking-[0.1em] text-[#333] md:text-[16px]">
            {category.name}
          </h3>
        </Link>
      </article>
    );
  }

  return (
    <article>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href={categoryHref} className="group inline-flex min-w-0 items-center gap-3 hover:opacity-90">
          <PlaceholderImage
            src={category.image}
            alt=""
            className="h-9 w-9 shrink-0 object-contain"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h3 className="border-l-4 border-[#16568D] pl-3 text-[15px] font-bold uppercase tracking-[0.1em] text-[#333] md:text-[16px]">
              {category.name}
            </h3>
            <p className="mt-0.5 pl-[calc(1rem+4px)] text-[12px] text-[#5b6775]">
              {subcategories.length} subcategor{subcategories.length === 1 ? "y" : "ies"}
            </p>
          </div>
        </Link>

        <Link
          href={categoryHref}
          className="shrink-0 text-[12px] font-semibold text-[#16568D] hover:text-[#004b87]"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {subcategories.map((subcategory) => (
          <ProductGroupCategoryTile
            key={subcategory.slug}
            category={subcategory}
          />
        ))}
      </div>
    </article>
  );
}

function ProductGroupSection({ group }) {
  const categories = group.children || [];
  const groupHref = getProductGroupHref(group.slug);

  return (
    <section id={group.slug} className="scroll-mt-28 border-b border-[#e8eef3] py-10 last:border-b-0 md:scroll-mt-36 md:py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e8eef3] bg-white p-2 md:h-20 md:w-20">
            <PlaceholderImage src={group.image} alt={group.name} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <Link href={groupHref} className="group inline-block hover:opacity-95">
              <h2 className="text-[26px] font-bold leading-tight text-[#004b87] md:text-[32px]">
                {group.name}
              </h2>
              <span className="mt-2 block h-1 w-16 rounded-full bg-[#16568D] transition-all group-hover:w-24" />
            </Link>
            <p className="mt-2 text-[13px] text-[#5b6775]">
              {categories.length} categor{categories.length === 1 ? "y" : "ies"}
            </p>
          </div>
        </div>

        <Link
          href={groupHref}
          className="inline-flex items-center gap-1 text-[13px] font-bold text-[#16568D] hover:text-[#004b87]"
        >
          Explore product group →
        </Link>
      </div>

      {categories.length > 0 ? (
        <div className="mt-8 space-y-10">
          {categories.map((category) => (
            <CategoryBlock key={category.slug} group={group} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-[14px] text-[#5b6775]">No categories in this group yet.</p>
      )}
    </section>
  );
}

export default function CatalogProductGroups({ groups = [] }) {
  if (groups.length === 0) {
    return (
      <section className="px-4 py-16 md:px-8">
        <p className="mx-auto max-w-7xl text-center text-[15px] text-[#5b6775]">
          No product groups are available right now. Make sure the API is running, then refresh this page.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap gap-2 border-b border-[#e8eef3] pb-6">
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="rounded-full border border-[#d7e4ef] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#004b87] transition-colors hover:border-[#16568D] hover:bg-[#eef5fb]"
            >
              {group.name}
            </a>
          ))}
        </nav>

        {groups.map((group) => (
          <ProductGroupSection key={group.slug} group={group} />
        ))}
      </div>
    </section>
  );
}
