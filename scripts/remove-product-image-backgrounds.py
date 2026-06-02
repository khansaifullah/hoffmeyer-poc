#!/usr/bin/env python3
"""Strip near-white backgrounds from product PNGs (transparent alpha)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

THRESHOLD = 252
SOFTNESS = 22


def process_pixel(r: int, g: int, b: int, a: int) -> tuple[int, int, int, int]:
    min_channel = min(r, g, b)
    if min_channel >= THRESHOLD:
        return (r, g, b, 0)
    if min_channel >= THRESHOLD - SOFTNESS:
        factor = (THRESHOLD - min_channel) / SOFTNESS
        return (r, g, b, int(a * factor))
    return (r, g, b, a)


def process_image(path: Path) -> None:
    image = Image.open(path).convert("RGBA")
    image.putdata([process_pixel(*pixel) for pixel in image.getdata()])
    image.save(path, "PNG", optimize=True)


def main() -> None:
    products_dir = Path(__file__).resolve().parents[1] / "frontend/public/images/products"
    for path in sorted(products_dir.glob("*.png")):
        process_image(path)
        print(f"updated {path.name}")


if __name__ == "__main__":
    main()
