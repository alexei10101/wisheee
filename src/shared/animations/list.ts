import type { Variants } from "framer-motion";

export const listContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};
