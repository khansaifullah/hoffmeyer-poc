export const HOFFMEYER_LOGO = "/images/brand/logo.png";

export const PLACEHOLDER_IMAGE_CLASS =
  "opacity-40 grayscale contrast-75 object-contain";

export function resolveImageSrc(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return null;
}
