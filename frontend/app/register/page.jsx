"use client";

import { useState } from "react";
import Link from "next/link";
import StaticPageShell from "../_components/StaticPageShell";
import { buttonRadius, cardRadius, inputRadius } from "@/lib/ui-presets";

const initialForm = {
  company: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <StaticPageShell
      title="Register"
      description="Create a Hoffmeyer business account for order history, quick ordering, and account pricing."
    >
      {submitted ? (
        <div className={`max-w-2xl ${cardRadius} border border-green-200 bg-green-50 px-6 py-8`}>
          <h2 className="text-[22px] font-bold text-[#004b87]">Registration received</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#333]">
            Thanks for your interest in a Hoffmeyer business account. Our team will review your
            request and contact you at <span className="font-semibold">{form.email}</span>.
          </p>
          <Link
            href="/login"
            className={`mt-6 inline-flex h-11 items-center justify-center bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
          <div>
            <label htmlFor="company" className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500">
              Company Name
            </label>
            <input
              id="company"
              required
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              className={`h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
            />
          </div>

          <div>
            <label htmlFor="contactName" className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500">
              Contact Name
            </label>
            <input
              id="contactName"
              required
              value={form.contactName}
              onChange={(event) => updateField("contactName", event.target.value)}
              className={`h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500">
                Business Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={`h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className={`h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500">
              Industry
            </label>
            <input
              id="industry"
              required
              value={form.industry}
              onChange={(event) => updateField("industry", event.target.value)}
              placeholder="Manufacturing, mining, food processing, etc."
              className={`h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
            />
          </div>

          <button
            type="submit"
            className={`h-11 bg-[#16568D] px-6 text-[14px] font-bold text-white hover:bg-[#124570] ${buttonRadius}`}
          >
            Submit Registration
          </button>

          <p className="text-[14px] text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#16568D] hover:underline">
              Login
            </Link>
          </p>
        </form>
      )}
    </StaticPageShell>
  );
}
