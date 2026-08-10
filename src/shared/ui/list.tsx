import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { listContainerVariants, listItemVariants } from "../animations/list";

type ListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
};

export function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.ul
      variants={shouldReduceMotion ? undefined : listContainerVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="show"
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.li
            key={getKey(item)}
            variants={shouldReduceMotion ? undefined : listItemVariants}
            layout="position"
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 40,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }
            }
            className="flex w-full justify-center px-0.5 py-0.5">
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
