import Header from "./_components/Header";
import Hero from "./_components/Hero";
import FeaturedProducts from "./_components/FeaturedProducts";
import FeaturedBrands from "./_components/FeaturedBrands";
import ShopByCategory from "./_components/ShopByCategory";
import InfoSections from "./_components/InfoSections";
import Newsletter from "./_components/Newsletter";
import LandingSmoothScroll from "./_components/LandingSmoothScroll";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <LandingSmoothScroll />
      <Header />
      <Hero />
      <ShopByCategory />
      <FeaturedBrands title="Our Featured Brands" />
      <FeaturedProducts title="Our Top Selling Products" />
      <InfoSections />
      <Newsletter />
    </main>
  );
}
