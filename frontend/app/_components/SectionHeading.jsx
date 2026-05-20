export default function SectionHeading({ accent, rest }) {
  return (
    <h2 className="text-[20px] font-black uppercase leading-tight tracking-wide text-[#111] md:text-[24px]">
      <span className="relative inline-block pb-2">
        {accent}
        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#16568D]" />
      </span>
      {rest ? <span>{rest.startsWith(" ") ? rest : ` ${rest}`}</span> : null}
    </h2>
  );
}
