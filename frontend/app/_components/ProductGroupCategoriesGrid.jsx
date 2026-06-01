import SectionHeading from "./SectionHeading";
import ProductGroupCategoryTile from "./ProductGroupCategoryTile";

export default function ProductGroupCategoriesGrid({
  group,
  categories = [],
  titleAccent = null,
  titleRest = "Categories",
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading accent={titleAccent || group.name.toUpperCase()} rest={titleRest} />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <ProductGroupCategoryTile key={category.slug} category={category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
