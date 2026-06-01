import { Suspense } from "react";
import QuoteForm from "./QuoteForm";

function QuoteFormFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-[15px] text-gray-500">Loading quote form...</p>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<QuoteFormFallback />}>
      <QuoteForm />
    </Suspense>
  );
}
