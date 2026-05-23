import Link from "next/link";
import SectionHeading from "./SectionHeading";
import StockBadge from "./StockBadge";
import { enrichProduct, formatPrice } from "@/lib/product";
import { cardRadius } from "@/lib/ui-presets";

export default function CategoryFeaturedProducts({ products, categoryName }) {
  const featured = products.slice(0, 5).map((product, index) =>
    enrichProduct(
      {
        ...product,
        factoryOrder:
          product.factoryOrder ||
          product.availabilityStatus === "factory_order" ||
          index === 4,
        brand:
          typeof product.brand === "string"
            ? product.brand
            : product.brand?.name || "Hoffmeyer Industrial",
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
          {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className={`group flex flex-col ${cardRadius} border border-gray-200 bg-white p-4 transition-colors hover:border-[#16568D]`}
              >
                <div className={`mb-4 flex aspect-square items-center justify-center ${cardRadius} bg-[#fafafa] p-3`}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
