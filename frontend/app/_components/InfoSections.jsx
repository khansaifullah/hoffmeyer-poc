"use client";

import { motion } from "motion/react";
import {
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";

const InfoSections = () => {
  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#f2f2f2] w-full py-12 md:py-16 px-6 text-center flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewViewport}
          variants={staggerContainerVariant}
          className="max-w-7xl mx-auto flex flex-col items-center"
        >
          <motion.h2
            variants={fadeUpVariant}
            transition={fadeUpTransition}
            className="text-[20px] md:text-[32px] font-bold text-[#004b87] mb-4 md:mb-6"
          >
            Get More With an Online Account
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            transition={fadeUpTransition}
            className="text-[15px] md:text-[20px] font-medium text-[#333] leading-relaxed max-w-[350px] md:max-w-4xl"
          >
            With an online account, you can get access to more savings, order history, quick ordering, and more to manage your shopping experience. Experience what hoffmeyerco.com can do for your business.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default InfoSections;
