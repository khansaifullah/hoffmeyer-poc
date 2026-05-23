"use client";

import { motion } from "motion/react";
import {
  fadeUpTransition,
  fadeUpVariant,
  inViewViewport,
  staggerContainerVariant,
} from "@/lib/motion-presets";
import { buttonRadius, inputRadius } from "@/lib/ui-presets";

const Newsletter = () => {
  return (
    <section className="bg-[#333333] w-full py-10 md:py-8 px-8 flex justify-center border-b-8 border-[#16568D]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={inViewViewport}
        variants={staggerContainerVariant}
        className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:gap-6 text-center md:text-left"
      >
        <motion.h3
          variants={fadeUpVariant}
          transition={fadeUpTransition}
          className="text-white text-[16px] md:text-[15px] font-bold italic mb-6 md:mb-0 leading-snug md:whitespace-nowrap"
        >
          Stay up to date with promotions by signing up for our newsletter
        </motion.h3>

        <motion.div
          variants={fadeUpVariant}
          transition={fadeUpTransition}
          className="w-full max-w-[350px] md:max-w-none md:w-auto flex flex-col md:flex-row gap-4 md:items-center"
        >
          <input
            type="email"
            placeholder="name@email.com"
            className={`w-full md:w-[320px] px-4 py-3 md:py-2.5 ${inputRadius} text-[#333] placeholder:text-[#ccc] placeholder:font-medium outline-none bg-white text-[15px] md:text-[14px]`}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-[#16568D] text-white py-3 md:py-2.5 px-12 md:px-8 mx-auto md:mx-0 ${buttonRadius} font-bold text-[18px] md:text-[14px] hover:bg-[#124570] transition-colors shadow-sm`}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
