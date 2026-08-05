import { AnimatePresence, motion } from "motion/react";
import { listContainerVariants, listItemVariants } from "../animations/list";

type ListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
};

export function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  return (
    <motion.ul
      variants={listContainerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2 self-center sm:gap-4 sm:items-centre">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.li
            key={getKey(item)}
            variants={listItemVariants}
            layout="position"
            exit={{
              opacity: 0,
              x: 40,
              scale: 0.8,
              transition: { duration: 0.2 },
            }}
            className="flex justify-center overflow-x-hidden">
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
