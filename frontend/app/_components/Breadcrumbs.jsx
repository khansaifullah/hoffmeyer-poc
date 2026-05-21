import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

const variants = {
  hero: {
    nav: "text-white/60",
    link: "hover:text-white",
    current: "text-white",
    separator: "text-white/40",
  },
  light: {
    nav: "text-[#16568D]/70",
    link: "hover:text-[#16568D]",
    current: "text-[#16568D]",
    separator: "text-[#16568D]/40",
  },
};

export default function Breadcrumbs({ items, variant = "hero", className }) {
  const styles = variants[variant] || variants.hero;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-4 flex flex-wrap items-center text-[12px] font-bold uppercase tracking-widest",
        styles.nav,
        className
      )}
    >
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <span className={cn("mx-2", styles.separator)} aria-hidden="true">
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(styles.link, item.className)}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(styles.current, item.className)}>
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
