import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { enrichProduct, formatPrice } from "@/lib/product";
import { getSubcategories, getSubcategoryHref } from "@/lib/category-content";
import { getSlug } from "@/lib/slug";

function StockBadge({ inStock, factoryOrder }) {
  if (factoryOrder) {
    return (
      <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-orange-600">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        Factory Order
      </p>
    );
  }

  if (inStock) {
    return (
      <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-green-600">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        In stock
      </p>
    );
  }

  return null;
}

export default function CategoryFeaturedProducts({ products, categoryName, categorySlug }) {
  const subcategories = getSubcategories(categorySlug);

  const featured = products.slice(0, 5).map((product, index) =>
    enrichProduct(
      {
        ...product,
        factoryOrder: index === 4,
        brand: product.brand || "Hoffmeyer Industrial",
      },
      index,
      categoryName
    )
  );

  return (
    <section className="bg-white px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading accent="Featured" rest="Products" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {featured.map((product, index) => {
            const subSlug = getSlug(subcategories[index % subcategories.length]?.name || "products");

            return (
              <Link
                key={product.slug}
                href={getSubcategoryHref(categorySlug, subSlug)}
                className="group flex flex-col border border-gray-200 bg-white p-4 transition-colors hover:border-[#16568D]"
              >
                <div className="mb-4 flex aspect-square items-center justify-center bg-[#fafafa] p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="text-[13px] leading-snug text-[#333]">
                  <span className="font-medium">{product.brand}</span>
                  <br />
                  <span className="font-bold">{product.mfrNumber}</span>
                </p>

                <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-gray-500">
                  {product.description}
                </p>

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Hoffmeyer Item # {product.itemNumber}
                </p>

                <StockBadge inStock={product.inStock} factoryOrder={product.factoryOrder} />

                <div className="mt-auto flex items-baseline gap-1 pt-4">
                  <span className="text-[22px] font-bold text-[#111]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[12px] text-gray-500">/each</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
