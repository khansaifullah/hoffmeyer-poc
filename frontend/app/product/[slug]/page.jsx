import Header from "../../_components/Header";
import Breadcrumbs from "../../_components/Breadcrumbs";
import Newsletter from "../../_components/Newsletter";
import ProductDetail from "../../_components/ProductDetail";
import { getProductBySlug } from "@/lib/api-server";
import { cardRadius } from "@/lib/ui-presets";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Hoffmeyer" };
  }

  return {
    title: `${product.name} | Hoffmeyer`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const specs = product.specs?.length
    ? product.specs.map((spec) => ({ label: spec.label, value: spec.value }))
    : [];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/#categories" },
              {
                label: product.categoryName,
                href: `/category/${product.categorySlug}`,
                className: "capitalize",
              },
              { label: product.name.replace(/®|™/g, "") },
            ]}
          />
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-12">
        <ProductDetail product={product} />
      </section>

      {specs.length > 0 && (
        <section className="border-t border-gray-200 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-[22px] font-bold text-[#222] md:text-[24px]">
              Technical Specifications
            </h2>

            <div className={`grid grid-cols-1 ${cardRadius} overflow-hidden border border-gray-200 md:grid-cols-2`}>
              {specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between gap-4 border-gray-200 px-5 py-4 ${
                    index % 2 === 0 ? "md:border-r" : ""
                  } ${index < specs.length - 2 ? "border-b" : ""}`}
                >
                  <span className="text-[12px] font-bold uppercase tracking-wide text-gray-400">
                    {spec.label}
                  </span>
                  <span className="text-right text-[14px] font-bold text-[#222]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </main>
  );
}
