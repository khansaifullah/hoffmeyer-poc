"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { buttonRadius } from "@/lib/ui-presets";

const imageInitial = { opacity: 0, scale: 1.04 };
const imageAnimate = { opacity: 1, scale: 1 };

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const reduceMotion = hasMounted && Boolean(prefersReducedMotion);

  const imageTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] };

  const itemTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="relative w-full h-[350px] md:h-auto md:aspect-[2560/900] flex items-center overflow-hidden">
      {/* Background Image - Responsive */}
      <motion.div
        className="absolute inset-0 z-0 md:relative md:block md:h-full"
        initial={imageInitial}
        animate={imageAnimate}
        transition={imageTransition}
      >
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet="/images/banners/desktop-ban.jpg" />
          <img
            src="/images/banners/mobile-banner.jpg"
            alt="Hoffmeyer Banner"
            className="w-full h-full object-cover object-bottom md:object-center"
          />
        </picture>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 md:absolute md:inset-0 max-w-7xl mx-auto w-full px-6 md:px-20 flex flex-col items-center md:items-start justify-center py-12 md:py-0">
        <motion.div
          className="flex flex-col gap-[10px] items-center md:items-start text-center md:text-left text-white max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.h1
            variants={itemVariants}
            transition={itemTransition}
            className="text-[35px] md:text-[56px] font-bold mb-1 md:mb-5 leading-[1.3]"
          >
            Complete Conveyor<br className="hidden md:block" /> Belting Solutions
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={itemTransition}
            className="text-[14px] md:text-[18px] font-bold mb-8 md:mb-3 opacity-100 drop-shadow-md"
          >
            Belts, Bearings, Rollers, Motors, Seals & more
          </motion.p>

          <motion.div variants={itemVariants} transition={itemTransition}>
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <Link
                href="/#categories"
                className={`bg-white text-[#0062B6] px-8 py-3 md:py-2 md:px-6 mt-16 md:mt-0 ${buttonRadius} font-semibold text-[20px] md:text-[14px] shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all inline-block text-center`}
              >
                Shop Products
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
