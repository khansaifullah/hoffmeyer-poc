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

const highlights = [
  {
    value: "90+",
    label: "Years serving industry",
    description: "Experience, knowledge, and commitment built since 1921.",
  },
  {
    value: "7",
    label: "Locations",
    description: "Distribution and support across the western United States.",
  },
  {
    value: "150+",
    label: "Years of legacy",
    description: "Tracing our roots to M.M. Cook & Son, founded in 1860.",
  },
  {
    value: "1-Stop",
    label: "Shopping",
    description: "Conveyor, hose, power transmission, and MRO in one place.",
  },
];

const coreValues = [
  {
    title: "Innovation & Application",
    description:
      "We meet customers at the intersection of their needs and constraints — with hands-on expertise in the latest technology, materials, and applications.",
    icon: "innovation",
  },
  {
    title: "Quality Assurance",
    description:
      "Across our locations, Hoffmeyer maintains one of the most comprehensive quality assurance programs in the industrial supply field.",
    icon: "quality",
  },
  {
    title: "More Choices, Better Value",
    description:
      "Our supply chain specialists widen the pool of application solutions and expand the value range of available options for every job.",
    icon: "value",
  },
];

const timeline = [
  {
    year: "1860",
    title: "M.M. Cook & Son",
    description:
      "Founded in San Francisco by sea captain Matthew M. Cook, trading in leather and tallow before evolving into industrial belting.",
  },
  {
    year: "1921",
    title: "Hoffmeyer Belting & Supply",
    description:
      "Oakland industrialist Albert J. Hoffmeyer establishes the company, manufacturing conveyor belting, hose, gaskets, and industrial products.",
  },
  {
    year: "1986",
    title: "Hoffmeyer / Cook Merger",
    description:
      "Hoffmeyer Corp. and Cook Rubber Co. combine to become Hoffmeyer/Cook Company, expanding services and product breadth.",
  },
  {
    year: "1994",
    title: "Hoffmeyer Company, Inc.",
    description:
      "San Diego Rubber Co. acquires Hoffmeyer Corp., continuing a growth cycle of strategic acquisitions across the West.",
  },
  {
    year: "2001–2009",
    title: "Continued Expansion",
    description:
      "Acquisitions including Capitol Industrial Supply, Pollard's Vulcanizing, and FD Company strengthen regional coverage and capabilities.",
  },
  {
    year: "Today",
    title: "We Keep Your Products Moving",
    description:
      "A complete line of industrial products with one-stop convenience — ready to meet plant maintenance, production, and OEM sourcing needs.",
  },
];

const productAreas = [
  "Conveyor Belt & Components",
  "Industrial & Hydraulic Hose",
  "Power Transmission & Bearings",
  "Pipe, Valves & Fittings",
  "Rubber, Gaskets & Seals",
  "Adhesives, Lubricants & Safety",
];

function ValueIcon({ name, className = "h-6 w-6" }) {
  const icons = {
    innovation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    quality: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    value: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function AboutContent() {
  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#16568D]">
                Hoffmeyer Company, Incorporated
              </p>
              <h2 className="mt-3 text-[32px] font-extrabold leading-tight text-[#004b87] md:text-[40px]">
                We keep your products moving!
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#333] md:text-[16px]">
                <p>
                  To better meet the changing needs of our customers, Hoffmeyer strives to keep up with
                  the latest industry advances in technology, materials, and application. With the added
                  convenience of one-stop shopping, we offer an extensive array of products to ensure
                  your production keeps moving.
                </p>
                <p>
                  From conveyor belting and power transmission to industrial hose, gaskets, and MRO
                  supplies, our team has the experience, knowledge, and commitment that comes from serving
                  the industry for over 90 years.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/catalog"
                  className={`inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#124570] ${buttonRadius}`}
                >
                  Browse Catalog
                </Link>
                <Link
                  href="/quote"
                  className={`inline-flex h-11 items-center justify-center border border-[#16568D] bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white ${buttonRadius}`}
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              transition={{ ...fadeUpTransition, delay: 0.08 }}
              className={`${cardRadius} border border-[#e8eef3] bg-white p-8 shadow-sm md:p-10`}
            >
              <SectionHeading accent="What" rest="We Supply" />
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {productAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 text-[14px] font-medium text-[#333]"
                  >
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#16568D]" />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[#e8eef3] pt-6 text-[14px] leading-relaxed text-[#5b6775]">
                Experts with the experience, knowledge, and commitment that comes from serving industry
                for over 90 years — conveyor belting, hose, bearings, and power transmission applications
                across the American West.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#e8eef3] bg-white px-4 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUpVariant}
                transition={fadeUpTransition}
                className={`${cardRadius} border border-gray-200 bg-[#fafafa] px-5 py-6 text-center md:px-6`}
              >
                <p className="text-[28px] font-extrabold leading-none text-[#004b87] md:text-[32px]">
                  {item.value}
                </p>
                <p className="mt-2 text-[13px] font-bold uppercase tracking-wide text-[#16568D]">
                  {item.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5b6775]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition} className="text-center">
              <SectionHeading accent="Core" rest="Values" />
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#333]">
                Hoffmeyer drives for innovation — delivering custom solutions where customer needs and
                constraints meet.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {coreValues.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeUpVariant}
                  transition={fadeUpTransition}
                  whileHover={cardHoverMotion}
                  className={`${cardRadius} border border-gray-200 bg-white p-6 shadow-sm md:p-7`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16568D]/10 text-[#16568D]">
                    <ValueIcon name={value.icon} />
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-[#004b87]">{value.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#5b6775]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <SectionHeading accent="Our" rest="History" />
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#5b6775]">
                From San Francisco leather belting in the 1860s to today&apos;s full-line industrial
                distributor — Hoffmeyer&apos;s story spans more than 150 years of American industry.
              </p>
            </motion.div>

            <div className="relative mt-10">
              <div className="absolute bottom-0 left-[18px] top-0 hidden w-px bg-[#16568D]/20 md:block" />

              <div className="space-y-6">
                {timeline.map((event, index) => (
                  <motion.article
                    key={`${event.year}-${event.title}`}
                    variants={fadeUpVariant}
                    transition={{ ...fadeUpTransition, delay: index * 0.04 }}
                    className="relative md:pl-14"
                  >
                    <span className="absolute left-0 top-6 hidden h-3 w-3 rounded-full bg-[#16568D] ring-4 ring-[#16568D]/15 md:block" />

                    <div
                      className={`${cardRadius} border border-[#e8eef3] bg-white p-5 transition-colors hover:border-[#16568D]/40 md:p-6`}
                    >
                      <p className="text-[13px] font-bold uppercase tracking-widest text-[#16568D]">
                        {event.year}
                      </p>
                      <h3 className="mt-1 text-[18px] font-bold text-[#004b87]">{event.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-[#5b6775]">{event.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#16568D_0%,#004b87_100%)] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
                Corporate Office
              </p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]">
                Ready to support your operation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                Contact Hoffmeyer for cross-reference help, application guidance, quotes, and account
                support across our distribution network.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              transition={{ ...fadeUpTransition, delay: 0.08 }}
              className={`${cardRadius} border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:p-8`}
            >
              <div className="space-y-5">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Address</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white">
                    2950 Merced St. Suite 200
                    <br />
                    San Leandro, CA 94577
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Phone</p>
                  <a href="tel:5109691200" className="mt-1 block text-[20px] font-bold hover:text-white/90">
                    (510) 969-1200
                  </a>
                  <a
                    href="tel:8003502358"
                    className="mt-1 block text-[15px] font-semibold text-white/90 hover:text-white"
                  >
                    Toll-free: (800) 350-2358
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Fax</p>
                  <p className="mt-1 text-[15px] text-white/90">(510) 394-0920</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 border-t border-white/20 pt-8">
                <Link
                  href="/locations"
                  className={`inline-flex h-11 items-center justify-center bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-white/90 ${buttonRadius}`}
                >
                  View Locations
                </Link>
                <Link
                  href="/resources"
                  className={`inline-flex h-11 items-center justify-center border border-white/40 px-6 text-[14px] font-bold text-white transition-colors hover:bg-white/10 ${buttonRadius}`}
                >
                  Resources & Support
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
