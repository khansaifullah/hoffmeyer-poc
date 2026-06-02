import Header from "../_components/Header";
import LocationsContent from "../_components/LocationsContent";
import LocationsHero from "../_components/LocationsHero";
import Newsletter from "../_components/Newsletter";

export const metadata = {
  title: "Locations | Hoffmeyer",
  description:
    "Find Hoffmeyer branch locations in California, Oregon, and Washington for industrial belting, hose, bearings, and MRO supplies.",
};

export default function LocationsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <LocationsHero />
      <LocationsContent />
      <Newsletter />
    </main>
  );
}
