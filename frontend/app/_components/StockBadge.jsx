export default function StockBadge({ inStock, factoryOrder, className = "" }) {
  if (factoryOrder) {
    return (
      <p className={`mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-orange-600 ${className}`}>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        Factory Order
      </p>
    );
  }

  if (inStock) {
    return (
      <p className={`mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-green-600 ${className}`}>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        In stock
      </p>
    );
  }

  return null;
}
