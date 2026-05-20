import Link from "next/link";
import { getCategoryName } from "@/lib/categories";

export default function CategoryHero({ slug, description }) {
  const categoryName = getCategoryName(slug);

  return (
    <section className="bg-[#16568D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <nav className="mb-4 flex text-[12px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#categories" className="hover:text-white">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white capitalize">{categoryName}</span>
        </nav>

        <h1 className="text-[32px] font-extrabold capitalize leading-tight md:text-[44px]">
          {categoryName}
        </h1>
        <p className="mt-3 max-w-3xl text-[16px] text-white/85 md:text-[18px]">
          {description ||
            `Browse ${categoryName} products, trusted brands, and top sellers for your operation.`}
        </p>
      </div>
    </section>
  );
}
