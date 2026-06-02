import Link from "next/link";
import ProductGroupCategoryTile from "@/app/_components/ProductGroupCategoryTile";
import { getMidCategoryHref, getProductGroupHref } from "@/lib/catalog-urls";

function CatalogCategoryHeading({ name }) {
  return (
    <h3 className="border-l-4 border-[#16568D] pl-3 text-[15px] font-bold uppercase tracking-[0.1em] text-[#333] md:text-[16px]">
      {name}
    </h3>
  );
}

function CategoryBlock({ group, category }) {
  const subcategories = category.children || [];
  const categoryHref = getMidCategoryHref(group.slug, category.slug);

  return (
    <div className="mt-6 md:mt-8">
      {subcategories.length > 0 ? (
        <>
          <Link href={categoryHref} className="inline-block hover:opacity-90">
            <CatalogCategoryHeading name={category.name} />
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((subcategory) => (
              <ProductGroupCategoryTile
                key={subcategory.slug}
                category={subcategory}
                group={group}
              />
            ))}
          </div>
        </>
      ) : (
        <Link href={categoryHref} className="inline-block hover:opacity-90">
          <CatalogCategoryHeading name={category.name} />
        </Link>
      )}
    </div>
  );
}

function ProductGroupSection({ group }) {
  const categories = group.children || [];
  const groupHref = getProductGroupHref(group.slug);

  return (
    <section className="border-b border-[#e8eef3] py-8 last:border-b-0 md:py-10">
      <Link href={groupHref} className="group inline-block hover:opacity-95">
        <h2 className="text-[26px] font-bold leading-tight text-[#004b87] md:text-[32px]">
          {group.name}
        </h2>
        <span className="mt-2 block h-1 w-16 rounded-full bg-[#16568D] transition-all group-hover:w-24" />
      </Link>

      {categories.length > 0 ? (
        <div className="mt-4">
          {categories.map((category) => (
            <CategoryBlock key={category.slug} group={group} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[14px] text-[#5b6775]">No categories in this group yet.</p>
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
        {groups.map((group) => (
          <ProductGroupSection key={group.slug} group={group} />
        ))}
      </div>
    </section>
  );
}
