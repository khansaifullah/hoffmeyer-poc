export const inViewViewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -50px 0px",
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const cardHoverMotion = {
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" },
};
