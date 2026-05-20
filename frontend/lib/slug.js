export function getSlug(name) {
  return name
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/®/g, "")
    .replace(/™/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
