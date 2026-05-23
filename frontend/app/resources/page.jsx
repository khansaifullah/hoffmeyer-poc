import Link from "next/link";
import StaticPageShell from "../_components/StaticPageShell";
import { cardRadius } from "@/lib/ui-presets";

const resources = [
  {
    title: "Product Catalog",
    description: "Browse categories, subcategories, and brands across conveyor, hose, bearings, and power transmission.",
    href: "/#categories",
  },
  {
    title: "Request a Quote",
    description: "Get pricing for volume orders, factory-order items, and plant maintenance projects.",
    href: "/register",
  },
  {
    title: "Technical Support",
    description: "Contact our team for cross-reference help, application guidance, and sourcing assistance.",
    href: "tel:8003502358",
  },
  {
    title: "Account Registration",
    description: "Open a business account for order history, quick ordering, and customer-specific pricing.",
    href: "/register",
  },
];

export default function ResourcesPage() {
  return (
    <StaticPageShell
      title="Resources"
      description="Tools and support for buyers, maintenance teams, and operations managers sourcing industrial components."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <Link
            key={resource.title}
            href={resource.href}
            className={`block ${cardRadius} border border-gray-200 bg-white p-6 transition-colors hover:border-[#16568D]`}
          >
            <h2 className="text-[20px] font-bold text-[#004b87]">{resource.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{resource.description}</p>
          </Link>
        ))}
      </div>
    </StaticPageShell>
  );
}
