"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import {
  cardHoverMotion,
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { buttonRadius, cardRadius } from "@/lib/ui-presets";

const primaryResources = [
  {
    title: "Product Catalog",
    description:
      "Browse product groups, categories, and brands across conveyor, hose, bearings, and power transmission.",
    href: "/catalog",
    cta: "Browse catalog",
    icon: "catalog",
    accent: "from-[#16568D]/15 to-[#40A8F3]/10",
    iconBg: "bg-[#16568D]/10 text-[#16568D]",
  },
  {
    title: "Request a Quote",
    description:
      "Get pricing for volume orders, factory-order items, and plant maintenance projects in minutes.",
    href: "/quote",
    cta: "Start a quote",
    icon: "quote",
    accent: "from-[#004b87]/10 to-[#16568D]/5",
    iconBg: "bg-[#004b87]/10 text-[#004b87]",
  },
  {
    title: "Technical Support",
    description:
      "Talk with our team for cross-reference help, application guidance, and sourcing assistance.",
    href: "tel:8003502358",
    cta: "Call support",
    icon: "support",
    accent: "from-[#40A8F3]/15 to-[#16568D]/5",
    iconBg: "bg-[#40A8F3]/15 text-[#16568D]",
  },
  {
    title: "Business Account",
    description:
      "Register for order history, quick reordering, saved lists, and customer-specific pricing.",
    href: "/register",
    cta: "Create account",
    icon: "account",
    accent: "from-[#16568D]/10 to-[#004b87]/5",
    iconBg: "bg-[#16568D]/10 text-[#004b87]",
  },
];

const quickLinks = [
  { label: "Compare Products", href: "/compare", description: "Side-by-side specs & pricing" },
  { label: "Store Locations", href: "/locations", description: "Distribution & pickup points" },
  { label: "About Hoffmeyer", href: "/about", description: "Our story & capabilities" },
  { label: "Sign In", href: "/login", description: "Access your online account" },
];

const supportTopics = [
  "Cross-reference and OEM substitution",
  "Belt, hose, and bearing application guidance",
  "Volume pricing and RFQ support",
  "Factory-order lead times and tracking",
  "Plant maintenance and MRO stocking programs",
];

const accountBenefits = [
  "Order history and quick reorder",
  "Saved product lists and favorites",
  "Customer-specific pricing where available",
  "Faster checkout for repeat buyers",
];

function ResourceIcon({ name, className = "h-6 w-6" }) {
  const icons = {
    catalog: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
      </svg>
    ),
    quote: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h6M7 3h10a2 2 0 012 2v12l-3-2-3 2-3-2-3 2V5a2 2 0 012-2z" />
      </svg>
    ),
    support: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l.8-3.2C3.3 15.4 3 13.7 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    account: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

function PrimaryResourceCard({ resource }) {
  const CardWrapper = resource.href.startsWith("tel:") ? "a" : Link;
  const linkProps = resource.href.startsWith("tel:")
    ? { href: resource.href }
    : { href: resource.href };

  return (
    <motion.div variants={fadeUpVariant} transition={fadeUpTransition} whileHover={cardHoverMotion}>
      <CardWrapper
        {...linkProps}
        className={`group relative flex h-full flex-col overflow-hidden ${cardRadius} border border-[#e8eef3] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#16568D] hover:shadow-md md:p-7`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${resource.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center ${cardRadius} ${resource.iconBg}`}>
            <ResourceIcon name={resource.icon} />
          </div>
          <span className="text-[#16568D] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div className="relative mt-5 flex flex-1 flex-col">
          <h3 className="text-[20px] font-bold leading-snug text-[#004b87]">{resource.title}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#5b6775]">{resource.description}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-wide text-[#16568D]">
            {resource.cta}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function ResourcesContent() {
  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <SectionHeading accent="Start" rest="Here" />
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5b6775] md:text-[16px]">
                Jump straight to the tools buyers and maintenance teams use most — from catalog search to
                quote requests and live support.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {primaryResources.map((resource) => (
                <PrimaryResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#e8eef3] bg-white px-4 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <SectionHeading accent="Quick" rest="Links" />
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <motion.div key={link.label} variants={fadeUpVariant} transition={fadeUpTransition}>
                  <Link
                    href={link.href}
                    className={`group flex h-full flex-col ${cardRadius} border border-gray-200 bg-[#fafafa] px-5 py-4 transition-all hover:border-[#16568D] hover:bg-white hover:shadow-sm`}
                  >
                    <span className="text-[15px] font-bold text-[#004b87] group-hover:text-[#16568D]">
                      {link.label}
                    </span>
                    <span className="mt-1 text-[13px] text-[#5b6775]">{link.description}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              variants={fadeUpVariant}
              transition={fadeUpTransition}
            >
              <SectionHeading accent="Expert" rest="Support" />
              <p className="mt-4 text-[15px] leading-relaxed text-[#333] md:text-[16px]">
                Hoffmeyer&apos;s team helps you match the right component to your application — whether
                you&apos;re replacing a failed bearing, specifying hose for a new line, or stocking critical
                spares for planned downtime.
              </p>

              <ul className="mt-6 space-y-3">
                {supportTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#333]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16568D]/10 text-[#16568D]">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="h-3 w-3">
                        <path d="M4.5 8.5L1.5 5.5l1-1 2 2 5-5 1 1-6 6z" />
                      </svg>
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              variants={fadeUpVariant}
              transition={{ ...fadeUpTransition, delay: 0.08 }}
              className={`${cardRadius} overflow-hidden border border-[#16568D]/20 bg-gradient-to-br from-[#16568D] to-[#004b87] p-8 text-white shadow-lg md:p-10`}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
                Talk to our team
              </p>
              <h3 className="mt-3 text-[28px] font-bold leading-tight md:text-[32px]">
                Ready when your line can&apos;t wait
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                Call for immediate help with cross-references, availability, and quote turnaround on
                qualified orders.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/20 pt-8">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Phone</p>
                  <a
                    href="tel:8003502358"
                    className="mt-1 block text-[24px] font-bold tracking-tight hover:text-white/90"
                  >
                    (800) 350-2358
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Hours</p>
                  <p className="mt-1 text-[15px] text-white/90">Mon–Fri, 7:00 AM – 5:00 PM CT</p>
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Locations</p>
                  <Link href="/locations" className="mt-1 inline-block text-[15px] font-semibold underline underline-offset-2 hover:text-white/90">
                    View distribution centers →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className={`${cardRadius} border border-[#e8eef3] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbfd_100%)] p-8 md:p-12`}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
                <SectionHeading accent="Online" rest="Account Benefits" />
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#5b6775]">
                  Create a business account to streamline repeat ordering and keep your plant maintenance
                  program organized.
                </p>
              </motion.div>

              <motion.ul
                variants={fadeUpVariant}
                transition={{ ...fadeUpTransition, delay: 0.06 }}
                className="space-y-3"
              >
                {accountBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className={`flex items-center gap-3 ${cardRadius} border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#333]`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22a06b]/10 text-[#22a06b]">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M4.5 8.5L1.5 5.5l1-1 2 2 5-5 1 1-6 6z" />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              variants={fadeUpVariant}
              transition={{ ...fadeUpTransition, delay: 0.1 }}
              className="mt-8 flex flex-wrap gap-4 border-t border-[#e8eef3] pt-8"
            >
              <Link
                href="/register"
                className={`inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#124570] ${buttonRadius}`}
              >
                Create Account
              </Link>
              <Link
                href="/catalog"
                className={`inline-flex h-11 items-center justify-center border border-[#16568D] bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white ${buttonRadius}`}
              >
                Browse Catalog
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
