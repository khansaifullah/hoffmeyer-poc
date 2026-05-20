import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { getCategoryName } from "@/lib/categories";

export default function BrandHero({ brand, categorySlug }) {
  const categoryName = getCategoryName(categorySlug);

  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <div className="flex w-full flex-col justify-center bg-white p-8 text-[#111] md:w-[340px] md:shrink-0">
          <div className="mb-6 flex min-h-[80px] items-center justify-center border border-gray-100 bg-[#fafafa] p-4">
            <BrandLogo brand={brand} size="lg" className="max-h-16" />
          </div>
          <label className="relative block">
            <span className="sr-only">Search {brand.name}</span>
            <input
              type="text"
              placeholder={`Search ${brand.name}`}
              className="h-11 w-full border border-gray-300 bg-white px-4 pr-10 text-[14px] text-gray-900 outline-none focus:border-[#16568D]"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </label>
        </div>

        <div className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <nav className="mb-4 flex flex-wrap text-[12px] font-semibold uppercase tracking-wide text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-white/80">Brands</span>
            <span className="mx-2">&gt;</span>
            <span className="text-white">{brand.name}</span>
            <span className="mx-2">&gt;</span>
            <Link href={`/category/${categorySlug}`} className="capitalize hover:text-white">
              {categoryName}
            </Link>
          </nav>

          <h1 className="relative inline-block pb-2 text-[32px] font-black uppercase leading-tight md:text-[40px]">
            {brand.name}
            <span className="absolute bottom-0 left-0 h-[3px] w-16 bg-[#16568D]" />
          </h1>

          <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-white/80 md:text-[15px]">
            {brand.description}
            {" "}
            <button type="button" className="font-semibold text-white underline underline-offset-2">
              Read more
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
