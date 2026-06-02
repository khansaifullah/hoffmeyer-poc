"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import {
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import {
  branches,
  branchRegions,
  corporateOffice,
  departmentContacts,
  regionFilters,
} from "@/lib/locations";
import { buttonRadius, cardRadius, pillRadius } from "@/lib/ui-presets";

const highlights = [
  { value: "7", label: "Branch locations", description: "California, Oregon, and Washington." },
  { value: "3", label: "States covered", description: "Western U.S. distribution network." },
  { value: "24/7", label: "Quote support", description: "Request pricing anytime online." },
  { value: "1-800", label: "350-2358", description: "Toll-free belt line and product help." },
];

function PhoneIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.548.774a11.042 11.042 0 005.516 5.516l.774-1.548a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function BranchRow({ branch, isLast = false }) {
  return (
    <article
      className={`grid grid-cols-1 gap-5 px-5 py-6 transition-colors hover:bg-[#fafcfd] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:px-8 md:py-7 ${
        isLast ? "" : "border-b border-[#e8eef3]"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16568D] text-[11px] font-bold tracking-wide text-white">
            {branch.stateAbbr}
          </span>
          <div className="min-w-0">
            <h3 className="text-[18px] font-bold leading-snug text-[#004b87] md:text-[20px]">
              {branch.cityLabel}
            </h3>
            <p className="text-[13px] text-[#5b6775]">{branch.name}</p>
          </div>
        </div>

        <address className="mt-4 not-italic text-[14px] leading-relaxed text-[#333]">
          {branch.address}
          <br />
          {branch.city}
        </address>

        <p className="mt-3 text-[13px] leading-relaxed text-[#5b6775]">{branch.note}</p>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <div className="flex flex-wrap gap-2 md:justify-end">
          <a
            href={`tel:${branch.phone}`}
            className={`inline-flex h-10 items-center gap-2 bg-[#16568D] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#124570] ${buttonRadius}`}
          >
            <PhoneIcon />
            {branch.phoneDisplay}
          </a>
          <a
            href={`mailto:${branch.email}`}
            className={`inline-flex h-10 items-center gap-2 border border-[#16568D] bg-white px-4 text-[13px] font-bold text-[#16568D] transition-colors hover:bg-[#eef5fb] ${buttonRadius}`}
          >
            <MailIcon />
            Email
          </a>
        </div>

        <div className="space-y-1 text-[13px] text-[#5b6775] md:text-right">
          {branch.fax ? (
            <p>
              <span className="font-semibold text-[#333]">Fax:</span> {branch.fax}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function BranchRegionGroup({ region, regionBranches }) {
  if (regionBranches.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-[#e8eef3] last:border-b-0">
      <div className="flex items-center justify-between border-b border-[#e8eef3] bg-[#f8fbfd] px-5 py-3.5 md:px-8">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#16568D]">{region}</h3>
        <span className="text-[12px] font-semibold text-[#5b6775]">
          {regionBranches.length} location{regionBranches.length === 1 ? "" : "s"}
        </span>
      </div>

      {regionBranches.map((branch, index) => (
        <BranchRow
          key={branch.email}
          branch={branch}
          isLast={index === regionBranches.length - 1}
        />
      ))}
    </div>
  );
}

export default function LocationsContent() {
  const [activeRegion, setActiveRegion] = useState("All");

  const groupedRegions = useMemo(() => {
    if (activeRegion === "All") {
      return branchRegions;
    }

    return [activeRegion];
  }, [activeRegion]);

  const branchesForRegion = (region) =>
    branches.filter((branch) => branch.region === region);

  return (
    <>
      <section className="border-b border-[#e8eef3] bg-white px-4 py-10 md:px-8 md:py-12">
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
                className={`${cardRadius} border border-gray-200 bg-[#fafafa] px-5 py-6 text-center`}
              >
                <p className="text-[26px] font-extrabold leading-none text-[#004b87] md:text-[30px]">
                  {item.value}
                </p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-[#16568D]">
                  {item.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5b6775]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]"
          >
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition}>
              <SectionHeading accent="Corporate" rest="Office" />
              <p className="mt-4 text-[15px] leading-relaxed text-[#5b6775]">
                Hoffmeyer Company, Incorporated — corporate headquarters and central support for
                accounts, accounting, and nationwide product inquiries.
              </p>
              <div className="mt-6 space-y-3 text-[14px] text-[#333]">
                <p>
                  <span className="font-semibold text-[#5b6775]">Address:</span>
                  <br />
                  {corporateOffice.address}
                  <br />
                  {corporateOffice.city}
                </p>
                <p>
                  <span className="font-semibold text-[#5b6775]">Phone:</span>{" "}
                  <a href={`tel:${corporateOffice.phone}`} className="font-medium text-[#16568D] hover:underline">
                    {corporateOffice.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#5b6775]">Toll-free:</span>{" "}
                  <a href={`tel:${corporateOffice.tollFree}`} className="font-medium text-[#16568D] hover:underline">
                    {corporateOffice.tollFreeDisplay}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#5b6775]">Fax:</span> {corporateOffice.fax}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              transition={{ ...fadeUpTransition, delay: 0.08 }}
              className={`${cardRadius} overflow-hidden border border-[#16568D]/20 bg-gradient-to-br from-[#16568D] to-[#004b87] p-8 text-white shadow-lg md:p-10`}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
                Need the right branch?
              </p>
              <h3 className="mt-3 text-[24px] font-bold leading-snug md:text-[28px]">
                Call the location nearest your plant or job site
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                Each branch supports conveyor belting, industrial and hydraulic hose, power
                transmission, and MRO products with local fulfillment and application expertise.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className={`inline-flex h-11 items-center justify-center bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-white/90 ${buttonRadius}`}
                >
                  Request a Quote
                </Link>
                <a
                  href={`tel:${corporateOffice.tollFree}`}
                  className={`inline-flex h-11 items-center justify-center border border-white/40 px-6 text-[14px] font-bold text-white transition-colors hover:bg-white/10 ${buttonRadius}`}
                >
                  Call (800) 350-2358
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={fadeUpVariant}
            transition={fadeUpTransition}
          >
            <div className="text-center">
              <SectionHeading accent="Branch" rest="Locations" />
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5b6775]">
                Seven Hoffmeyer branches across the western U.S. Select a region to narrow the list.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
              {regionFilters.map((region) => {
                const isActive = activeRegion === region;
                const count =
                  region === "All"
                    ? branches.length
                    : branches.filter((branch) => branch.region === region).length;

                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    className={`${pillRadius} inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                      isActive
                        ? "bg-[#16568D] text-white shadow-sm"
                        : "border border-[#d7e4ef] bg-white text-[#004b87] hover:border-[#16568D] hover:bg-[#eef5fb]"
                    }`}
                  >
                    {region}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        isActive ? "bg-white/20 text-white" : "bg-[#eef5fb] text-[#16568D]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className={`mt-8 overflow-hidden ${cardRadius} border border-[#e8eef3] bg-white shadow-sm`}
            >
              {groupedRegions.map((region) => (
                <BranchRegionGroup
                  key={region}
                  region={region}
                  regionBranches={branchesForRegion(region)}
                />
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
            <motion.div variants={fadeUpVariant} transition={fadeUpTransition} className="text-center">
              <SectionHeading accent="Specialist" rest="Departments" />
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#333]">
                Reach the right Hoffmeyer team for belts, hose, Spanish-language support, and general
                product inquiries.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {departmentContacts.map((dept) => (
                <motion.div
                  key={dept.email}
                  variants={fadeUpVariant}
                  transition={fadeUpTransition}
                  className={`${cardRadius} border border-gray-200 bg-white p-5 md:p-6`}
                >
                  <h3 className="text-[15px] font-bold text-[#004b87]">{dept.label}</h3>
                  <p className="mt-3">
                    <a href={`tel:${dept.phone}`} className="text-[14px] font-semibold text-[#16568D] hover:underline">
                      {dept.phoneDisplay}
                    </a>
                  </p>
                  <p className="mt-2">
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-[13px] text-[#5b6775] hover:text-[#16568D] hover:underline"
                    >
                      {dept.email}
                    </a>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[#e8eef3] bg-white px-4 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            variants={fadeUpVariant}
            transition={fadeUpTransition}
            className={`${cardRadius} border border-[#e8eef3] bg-[#f8fbfd] p-8 text-center md:p-10`}
          >
            <p className="text-[15px] leading-relaxed text-[#5b6775]">
              Need help choosing a pickup location or arranging freight delivery?
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className={`inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
              >
                Create an Account
              </Link>
              <Link
                href="/resources"
                className={`inline-flex h-11 items-center justify-center border border-[#16568D] bg-white px-6 text-[14px] font-bold text-[#16568D] transition-colors hover:bg-[#16568D] hover:text-white ${buttonRadius}`}
              >
                Resources & Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
