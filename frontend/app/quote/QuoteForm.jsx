"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import StaticPageShell from "../_components/StaticPageShell";
import { buildQuoteComment, COUNTRIES, US_STATES } from "@/lib/quote";
import { buttonRadius, cardRadius, inputRadius } from "@/lib/ui-presets";

const fieldClassName = `h-11 w-full border border-gray-300 px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`;
const labelClassName = "mb-2 block text-[13px] font-bold uppercase tracking-wide text-gray-500";
const selectClassName = `h-11 w-full border border-gray-300 bg-white px-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`;

function FormSection({ title, children }) {
  return (
    <div className="space-y-5">
      <h2 className="border-b border-gray-200 pb-2 text-[18px] font-bold text-[#004b87]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, htmlFor, required = false, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name") || "";
  const productSlug = searchParams.get("product") || "";
  const quantity = searchParams.get("qty") || "1";

  const defaultComments = useMemo(
    () => buildQuoteComment(productName, quantity),
    [productName, quantity]
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phone: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    comments: defaultComments,
  });
  const [showAddressLine2, setShowAddressLine2] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <StaticPageShell
      title="Request a Quote"
      description="Tell us about your project and our team will respond with pricing, availability, and lead times."
    >
      {submitted ? (
        <div className={`max-w-3xl ${cardRadius} border border-green-200 bg-green-50 px-6 py-8`}>
          <h2 className="text-[22px] font-bold text-[#004b87]">Quote request received</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#333]">
            Thank you, {form.firstName}. Our team will review your request and contact you at{" "}
            <span className="font-semibold">{form.email}</span>
            {form.phone ? (
              <>
                {" "}
                or <span className="font-semibold">{form.phone}</span>
              </>
            ) : null}
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
          {productName ? (
            <div className={`${cardRadius} border border-[#16568D]/20 bg-[#f8fbfd] px-4 py-3 text-[14px] text-[#333]`}>
              <span className="font-semibold text-[#16568D]">Product:</span>{" "}
              {productName.replace(/®|™/g, "")}
              {productSlug ? (
                <span className="text-gray-500"> · Ref: {productSlug}</span>
              ) : null}
            </div>
          ) : null}

          <FormSection title="Personal Information">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="First Name" htmlFor="firstName" required>
                <input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  placeholder="Enter First Name"
                  className={fieldClassName}
                />
              </Field>

              <Field label="Last Name" htmlFor="lastName" required>
                <input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={(event) => updateField("lastName", event.target.value)}
                  placeholder="Enter Last Name"
                  className={fieldClassName}
                />
              </Field>
            </div>

            <Field label="Email Address" htmlFor="email" required>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="example@email.com"
                className={fieldClassName}
              />
            </Field>
          </FormSection>

          <FormSection title="Company Information">
            <Field label="Company Name" htmlFor="companyName" required>
              <input
                id="companyName"
                required
                value={form.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                placeholder="Company Name"
                className={fieldClassName}
              />
            </Field>

            <Field label="Phone Number" htmlFor="phone" required>
              <div className="flex gap-2">
                <span
                  className={`inline-flex h-11 shrink-0 items-center border border-gray-300 bg-gray-50 px-3 text-[14px] font-semibold text-gray-600 ${inputRadius}`}
                >
                  +1
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Phone Number"
                  className={fieldClassName}
                />
              </div>
            </Field>

            <Field label="Country" htmlFor="country" required>
              <select
                id="country"
                required
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
                className={selectClassName}
              >
                {COUNTRIES.map((country) => (
                  <option key={country.value || "placeholder"} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Address Line 1" htmlFor="addressLine1" required>
              <input
                id="addressLine1"
                required
                value={form.addressLine1}
                onChange={(event) => updateField("addressLine1", event.target.value)}
                placeholder="Address"
                className={fieldClassName}
              />
            </Field>

            {showAddressLine2 ? (
              <Field label="Address Line 2" htmlFor="addressLine2">
                <input
                  id="addressLine2"
                  value={form.addressLine2}
                  onChange={(event) => updateField("addressLine2", event.target.value)}
                  placeholder="Apartment, suite, unit, etc."
                  className={fieldClassName}
                />
              </Field>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddressLine2(true)}
                className="text-[14px] font-semibold text-[#16568D] hover:underline"
              >
                Add Address Line
              </button>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Field label="City" htmlFor="city" required>
                <input
                  id="city"
                  required
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="City"
                  className={fieldClassName}
                />
              </Field>

              <Field label="State" htmlFor="state" required>
                <select
                  id="state"
                  required
                  value={form.state}
                  onChange={(event) => updateField("state", event.target.value)}
                  className={selectClassName}
                >
                  {US_STATES.map((state) => (
                    <option key={state.value || "placeholder"} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Postal Code" htmlFor="postalCode" required>
                <input
                  id="postalCode"
                  required
                  value={form.postalCode}
                  onChange={(event) => updateField("postalCode", event.target.value)}
                  placeholder="55555"
                  className={fieldClassName}
                />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Comments">
            <Field label="Comments" htmlFor="comments">
              <textarea
                id="comments"
                rows={5}
                value={form.comments}
                onChange={(event) => updateField("comments", event.target.value)}
                placeholder="Enter Comments Here"
                className={`min-h-[140px] w-full resize-y border border-gray-300 px-3 py-3 text-[15px] text-[#333] outline-none focus:border-[#16568D] ${inputRadius}`}
              />
            </Field>
          </FormSection>

          <button
            type="submit"
            className={`h-12 w-full max-w-xs bg-[#16568D] px-8 text-[15px] font-bold text-white hover:bg-[#124570] md:w-auto ${buttonRadius}`}
          >
            Submit
          </button>
        </form>
      )}
    </StaticPageShell>
  );
}
