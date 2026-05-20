import Link from "next/link";

const defaultProducts = [
  { name: "Heavy-Duty Belt", image: "/images/products/heavy-duty-belt.png", category: "conveyor-belts" },
  { name: "Dodge® Pillow Block Bearings", image: "/images/products/bearing.png", category: "bearings" },
  { name: "WD40® Silicone Lubricant", image: "/images/products/wd40.png", category: "adhesives-and-lubricants" },
  { name: "Huskey™ Lube-O-Seal", image: "/images/products/huskey.png", category: "adhesives-and-lubricants" },
  { name: "Oil Seals", image: "/images/products/oil-seal.png", category: "rubber-and-gaskets" },
  { name: "Fuel Transfer Hose", image: "/images/products/fuel-hose.png", category: "industrial-hose" },
];

export default function FeaturedProducts({
  title = "Featured Products",
  products = defaultProducts,
  linkHref = null,
}) {
  return (
    <section className="bg-white px-4 py-7 md:px-0 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <h2 className="mb-6 text-center text-[24px] font-bold text-[#004b87] md:mb-10 md:text-[32px]">
          {title}
        </h2>

        <div className="relative w-full md:px-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {products.slice(0, 6).map((product, index) => {
              const href = linkHref || `/category/${product.category}`;

              return (
                <Link
                  href={href}
                  key={index}
                  className="group flex aspect-square cursor-pointer flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#16568D] hover:shadow-lg md:rounded-xl md:p-3"
                >
                  <div className="flex min-h-0 w-full flex-1 items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="flex h-[40px] items-center justify-center text-center text-[14px] font-semibold leading-tight text-gray-800 transition-colors duration-200 group-hover:text-[#16568D] md:h-[36px] md:text-[13px] md:font-bold">
                    {product.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
