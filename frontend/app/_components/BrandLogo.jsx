import Image from "next/image";

export default function BrandLogo({ brand, className = "", size = "default" }) {
  const heights = {
    sm: "h-6 md:h-8",
    default: "h-8 md:h-10",
    lg: "h-9 md:h-14",
  };

  const heightClass = heights[size] || heights.default;

  return (
    <Image
      src={brand.logo}
      alt={`${brand.name} logo`}
      width={160}
      height={48}
      className={`${heightClass} w-auto max-w-full object-contain ${className}`.trim()}
    />
  );
}
