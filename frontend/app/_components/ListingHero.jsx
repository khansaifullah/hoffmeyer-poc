import Link from "next/link";
import { getCategoryName } from "@/lib/categories";

export default function ListingHero({
  categorySlug,
  categoryName,
  title,
  description,
  brandName = null,
  brandSlug = null,
}) {
  const parentName = categoryName || getCategoryName(categorySlug);
  const displayTitle = title || parentName;

  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <nav className="mb-4 flex flex-wrap text-[12px] font-semibold uppercase tracking-wide text-white/60">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-white capitalize">
            {parentName}
          </Link>
          {brandName && brandSlug && (
            <>
              <span className="mx-2">&gt;</span>
              <Link href={`/category/${categorySlug}/brand/${brandSlug}`} className="hover:text-white">
                {brandName}
              </Link>
            </>
          )}
          <span className="mx-2">&gt;</span>
          <span className="text-white">{displayTitle}</span>
        </nav>

        <h1 className="relative inline-block pb-2 text-[28px] font-black uppercase leading-tight md:text-[36px]">
          {displayTitle}
          <span className="absolute bottom-0 left-0 h-[3px] w-16 bg-[#16568D]" />
        </h1>

        <p className="mt-4 max-w-4xl text-[14px] leading-relaxed text-white/80 md:text-[15px]">
          {description ||
            `Shop ${displayTitle.toLowerCase()} for industrial applications. Hoffmeyer supplies reliable components with fast fulfillment for maintenance and MRO teams.`}
          {" "}
          <button type="button" className="font-semibold text-white underline underline-offset-2">
            Read more
          </button>
        </p>
      </div>
    </section>
  );
}
