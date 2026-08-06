import { DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

// Fade dialog in
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const contentVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function DialogCustomOverlay() {
  return (
    <DialogOverlay asChild>
      <motion.div
        className="fixed inset-0 z-100 bg-foreground/40 backdrop-blur-sm"
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
        className="fixed inset-2 z-100 sm:top-1/2 sm:left-1/2 sm:inset-auto sm:w-[90vw] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-border bg-card text-card-foreground shadow-2xl sm:rounded-lg sm:shadow-primary/10">
          <div className="flex-1 overflow-y-auto p-2 sm:p-6 no-scrollbar">{children}</div>
        </div>
      </motion.div>
    </DialogContent>
  );
}
