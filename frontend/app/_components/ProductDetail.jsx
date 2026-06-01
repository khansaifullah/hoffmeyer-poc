"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, getProductSku } from "@/lib/product";
import { getQuoteHref } from "@/lib/quote";
import { buttonRadius, cardRadius, inputRadius } from "@/lib/ui-presets";

const SIZE_OPTIONS = ['12"', '24"', '36"', '48"'];

export default function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);

  const galleryImages =
    product.images?.length > 0
      ? product.images.map((image) => image.url)
      : [product.image, product.image, product.image, product.image];
  const sku = product.sku || getProductSku(product);

  const decreaseQty = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQty = () => setQuantity((current) => current + 1);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className={`flex aspect-square items-center justify-center ${cardRadius} border border-gray-200 bg-[#f5f5f5] p-10`}>
          <img
            src={galleryImages[activeImage]}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`flex aspect-square items-center justify-center ${cardRadius} border bg-[#f5f5f5] p-3 transition-colors ${
                activeImage === index
                  ? "border-[#16568D] ring-1 ring-[#16568D]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img src={image} alt="" className="max-h-full max-w-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-wide text-[#16568D]">
          SKU: {sku}
        </p>

        <h1 className="mt-2 text-[30px] font-bold leading-tight text-[#222] md:text-[34px]">
          {product.name.replace(/®|™/g, "")}
        </h1>

        <p className="mt-4 text-[34px] font-bold text-[#16568D] md:text-[38px]">
          {formatPrice(product.price)}
        </p>

        {product.inStock && (
          <span className="mt-3 inline-flex rounded-full bg-[#22a06b] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
            In Stock
          </span>
        )}

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-gray-600">
          {product.description}
        </p>

        <div className="mt-8">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-gray-500">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-[56px] border px-4 py-2.5 text-[14px] font-semibold transition-colors ${buttonRadius} ${
                  selectedSize === size
                    ? "border-[#16568D] bg-[#16568D] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-[#16568D]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className={`flex h-12 w-full max-w-[148px] items-center border border-gray-300 bg-white sm:max-w-none sm:w-fit ${inputRadius}`}>
            <button
              type="button"
              onClick={decreaseQty}
              className="flex h-full w-11 items-center justify-center text-[20px] text-gray-600 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="flex h-full min-w-[48px] flex-1 items-center justify-center border-x border-gray-300 px-3 text-[16px] font-semibold text-[#222] sm:flex-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQty}
              className="flex h-full w-11 items-center justify-center text-[20px] text-gray-600 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <Link
            href={getQuoteHref({
              productSlug: product.slug,
              productName: product.name,
              quantity,
            })}
            className={`inline-flex h-14 w-full items-center justify-center bg-[#16568D] px-6 text-[16px] font-bold text-white hover:bg-[#124570] sm:h-12 ${buttonRadius}`}
          >
            Request a Quote
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-8 border-t border-gray-200 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16568D]/10 text-[#16568D]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#222]">Secure Warranty</p>
              <p className="text-[12px] text-gray-500">Quality guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16568D]/10 text-[#16568D]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#222]">Fast Shipping</p>
              <p className="text-[12px] text-gray-500">Ships from Hoffmeyer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
