import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-[350px] md:h-auto md:aspect-[2560/900] flex items-center overflow-hidden">
      {/* Background Image - Responsive */}
      <picture className="absolute inset-0 z-0 md:relative md:block md:h-full">
        <source media="(min-width: 768px)" srcSet="/images/banners/desktop-ban.jpg" />
        <img
          src="/images/banners/mobile-banner.jpg"
          alt="Hoffmeyer Banner"
          className="w-full h-full object-cover object-bottom md:object-center"
        />
      </picture>

      {/* Main Content Container */}
      <div className="relative z-20 md:absolute md:inset-0 max-w-7xl mx-auto w-full px-6 md:px-20 flex flex-col items-center md:items-start justify-center py-12 md:py-0">

        {/* Text Section */}
        <div className="flex flex-col gap-[10px] items-center md:items-start text-center md:text-left text-white max-w-2xl">
          <h1 className="text-[35px] md:text-[56px] font-bold mb-1 md:mb-5 leading-[1.3]">
            Complete Conveyor<br className="hidden md:block" /> Belting Solutions
          </h1>

          <p className="text-[14px] md:text-[18px] font-bold mb-8 md:mb-3 opacity-100 drop-shadow-md">
            Belts, Bearings, Rollers, Motors, Seals & more
          </p>

          <Link href="/#categories" className="bg-white text-[#0062B6] px-8 py-3 md:py-2 md:px-6 mt-16 md:mt-0 rounded-lg md:rounded-md font-semibold text-[20px] md:text-[14px] shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all inline-block text-center">
            Shop Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
