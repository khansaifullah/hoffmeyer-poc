export default function SectionLoader({
  label = "Loading...",
  className = "bg-white",
  minHeight = "min-h-[220px]",
}) {
  return (
    <section
      className={`flex flex-col items-center justify-center px-4 py-16 md:px-8 ${minHeight} ${className}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#e8eef3] border-t-[#16568D]"
        role="status"
        aria-label={label}
      />
      {label ? <p className="mt-4 text-[14px] font-medium text-[#5b6775]">{label}</p> : null}
    </section>
  );
}
