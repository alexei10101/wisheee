import { DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

// Fade dialog in
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};
const contentVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function DialogCustomOverlay() {
  return (
    <DialogOverlay asChild>
      <motion.div
        className="fixed inset-0 bg-black"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        transition={{ duration: 0.2 }}
      />
    </DialogOverlay>
  );
}

export function DialogCustomContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogContent asChild>
      <motion.div
        className="fixed top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}>
        {children}
      </motion.div>
    </DialogContent>
  );
}
