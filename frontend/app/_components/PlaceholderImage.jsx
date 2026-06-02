import { HOFFMEYER_LOGO, PLACEHOLDER_IMAGE_CLASS, resolveImageSrc } from "@/lib/images";

export default function PlaceholderImage({
  src,
  fallbackSrc,
  alt = "",
  className = "",
  placeholderClassName = PLACEHOLDER_IMAGE_CLASS,
  ...props
}) {
  const resolved = resolveImageSrc(src, fallbackSrc);

  if (resolved) {
    return <img src={resolved} alt={alt} className={className} {...props} />;
  }

  return (
    <img
      src={HOFFMEYER_LOGO}
      alt={alt || "Placeholder"}
      className={[placeholderClassName, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
