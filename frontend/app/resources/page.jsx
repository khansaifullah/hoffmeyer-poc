import Header from "../_components/Header";
import Newsletter from "../_components/Newsletter";
import ResourcesContent from "../_components/ResourcesContent";
import ResourcesHero from "../_components/ResourcesHero";

export const metadata = {
  title: "Resources | Hoffmeyer",
  description:
    "Tools, guides, and support for buyers and maintenance teams sourcing industrial belting, bearings, hose, and MRO components.",
};

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <ResourcesHero />
      <ResourcesContent />
      <Newsletter />
    </main>
  );
}
