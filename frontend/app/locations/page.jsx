import Link from "next/link";
import StaticPageShell from "../_components/StaticPageShell";
import { cardRadius } from "@/lib/ui-presets";

const locations = [
  {
    name: "St. Louis Headquarters",
    address: "5300 Hoffmeyer Industrial Drive, St. Louis, MO 63110",
    phone: "(800) 350-2358",
    hours: "Mon–Fri, 7:00 AM – 5:00 PM CT",
  },
  {
    name: "Midwest Distribution Center",
    address: "1200 Conveyor Way, Indianapolis, IN 46241",
    phone: "(800) 350-2358",
    hours: "Mon–Fri, 8:00 AM – 4:30 PM ET",
  },
];

export default function LocationsPage() {
  return (
    <StaticPageShell
      title="Locations"
      description="Find Hoffmeyer distribution and support locations for industrial belting, bearings, hose, and MRO supplies."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <article key={location.name} className={`${cardRadius} border border-gray-200 bg-white p-6`}>
            <h2 className="text-[20px] font-bold text-[#004b87]">{location.name}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#333]">{location.address}</p>
            <p className="mt-2 text-[15px] text-[#333]">
              <span className="font-semibold">Phone:</span> {location.phone}
            </p>
            <p className="mt-1 text-[15px] text-gray-600">
              <span className="font-semibold text-[#333]">Hours:</span> {location.hours}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-[15px] text-gray-600">
        Need help choosing a pickup location or arranging freight delivery?{" "}
        <Link href="/register" className="font-semibold text-[#16568D] hover:underline">
          Create an account
        </Link>{" "}
        or call{" "}
        <a href="tel:8003502358" className="font-semibold text-[#16568D] hover:underline">
          (800) 350-2358
        </a>
        .
      </p>
    </StaticPageShell>
  );
}
