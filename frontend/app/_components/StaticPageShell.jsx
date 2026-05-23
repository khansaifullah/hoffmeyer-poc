"use client";

import Header from "./Header";
import Newsletter from "./Newsletter";

export default function StaticPageShell({ title, description, children }) {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <section className="bg-[#40A8F3] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
          <h1 className="text-[32px] font-extrabold leading-tight md:text-[44px]">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-3xl text-[16px] text-white/85 md:text-[18px]">{description}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-14">{children}</section>

      <Newsletter />
    </main>
  );
}
