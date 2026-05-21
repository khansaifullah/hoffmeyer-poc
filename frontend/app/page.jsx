import Header from "./_components/Header";
import Hero from "./_components/Hero";
import FeaturedProducts from "./_components/FeaturedProducts";
import FeaturedBrands from "./_components/FeaturedBrands";
import ShopByCategory from "./_components/ShopByCategory";
import InfoSections from "./_components/InfoSections";
import Newsletter from "./_components/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <ShopByCategory />
      <FeaturedProducts title="Our Top Selling Products" />
      <FeaturedBrands titleAccent="Our Featured" titleRest="Brands" />
      <InfoSections />
      <Newsletter />
    </main>
  );
}
