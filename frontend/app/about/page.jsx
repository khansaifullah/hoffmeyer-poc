import Link from "next/link";
import StaticPageShell from "../_components/StaticPageShell";
import { buttonRadius } from "@/lib/ui-presets";

export default function AboutPage() {
  return (
    <StaticPageShell
      title="About Us"
      description="Hoffmeyer supplies industrial belting, bearings, hose, and MRO components to keep production lines moving."
    >
      <div className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-[#333]">
        <p>
          Hoffmeyer is a B2B industrial distributor focused on conveyor belting, power transmission,
          fluid handling, and plant maintenance products. We help maintenance teams, OEMs, and
          operations managers source reliable components with fast fulfillment and knowledgeable support.
        </p>
        <p>
          From heavy-duty conveyor belts and bearings to hose assemblies, seals, and lubricants, our
          catalog is built for real-world uptime requirements. Customers rely on Hoffmeyer for
          cross-reference support, account pricing, and consistent product availability.
        </p>
        <p>
          Whether you are stocking critical spares or sourcing for a new installation, our team is
          ready to help you find the right product for the application.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/#categories"
          className={`inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
        >
          Shop Products
        </Link>
        <Link
          href="/locations"
          className={`inline-flex h-11 items-center justify-center border border-[#16568D] bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white ${buttonRadius}`}
        >
          View Locations
        </Link>
      </div>
    </StaticPageShell>
  );
}
