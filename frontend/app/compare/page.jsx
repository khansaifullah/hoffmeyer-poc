import Link from "next/link";
import Header from "../_components/Header";
import CompareHero from "../_components/CompareHero";
import Newsletter from "../_components/Newsletter";
import StockBadge from "../_components/StockBadge";
import { getProductBySlug } from "@/lib/api-server";
import { formatPrice } from "@/lib/product";
import { buttonRadius, cardRadius } from "@/lib/ui-presets";

export async function generateMetadata() {
  return {
    title: "Compare Products | Hoffmeyer",
    description: "Compare industrial products side by side.",
  };
}

export default async function ComparePage({ searchParams }) {
  const resolvedSearch = await searchParams;
  const slugs = String(resolvedSearch?.slugs || "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 4);

  const products = (
    await Promise.all(slugs.map((slug) => getProductBySlug(slug)))
  ).filter(Boolean);

  const rows = [
    { label: "Price", render: (product) => formatPrice(product.price) },
    { label: "Hoffmeyer Item #", render: (product) => product.itemNumber || "—" },
    { label: "MFR #", render: (product) => product.mfrNumber || "—" },
    { label: "Material", render: (product) => product.material || "—" },
    {
      label: "Availability",
      render: (product) => (
        <StockBadge inStock={product.inStock} factoryOrder={product.factoryOrder} />
      ),
    },
    {
      label: "Description",
      render: (product) => (
        <p className="text-[13px] leading-relaxed text-gray-600">{product.description || "—"}</p>
      ),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <CompareHero />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {products.length === 0 ? (
          <div className={`${cardRadius} border border-gray-200 bg-white px-6 py-16 text-center`}>
            <p className="text-[16px] font-semibold text-[#333]">No products selected for comparison.</p>
            <p className="mt-2 text-[14px] text-gray-500">
              Use the compare checkbox on a product listing to add items here.
            </p>
            <Link
              href="/#categories"
              className={`mt-6 inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className={`overflow-x-auto ${cardRadius} border border-gray-200 bg-white`}>
            <table className="min-w-[720px] w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#fafafa]">
                  <th className="w-40 px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Product
                  </th>
                  {products.map((product) => (
                    <th key={product.slug} className="min-w-[220px] px-4 py-4 text-left align-top">
                      <div className={`mb-4 flex h-28 items-center justify-center ${cardRadius} border border-gray-200 bg-white p-3`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-[16px] font-bold leading-snug text-[#004b87] hover:underline"
                      >
                        {product.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-200">
                    <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
                      {row.label}
                    </th>
                    {products.map((product) => (
                      <td key={`${product.slug}-${row.label}`} className="px-4 py-4 align-top text-[14px] text-[#333]">
                        {row.render(product)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    Actions
                  </th>
                  {products.map((product) => (
                    <td key={`${product.slug}-actions`} className="px-4 py-4 align-top">
                      <Link
                        href={`/product/${product.slug}`}
                        className={`inline-flex h-10 items-center justify-center bg-[#004b87] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#003a63] ${buttonRadius}`}
                      >
                        View Product
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Newsletter />
    </main>
  );
}
