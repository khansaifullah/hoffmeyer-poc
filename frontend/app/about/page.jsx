import AboutContent from "../_components/AboutContent";
import AboutHero from "../_components/AboutHero";
import Header from "../_components/Header";
import Newsletter from "../_components/Newsletter";

export const metadata = {
  title: "About Us | Hoffmeyer",
  description:
    "Founded in Oakland, California in 1921, Hoffmeyer Company supplies industrial rubber products, conveyor belts, power transmission equipment, and MRO supplies.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AboutHero />
      <AboutContent />
      <Newsletter />
    </main>
  );
}
