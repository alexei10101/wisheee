import { DialogClose, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./kit/button";

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
        className="fixed inset-0 z-100 bg-foreground/45 backdrop-blur-sm motion-reduce:transition-none"
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
        className="fixed top-1/2 left-1/2 z-100 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 motion-reduce:transform-none"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
      >
        <div className="relative flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-2xl shadow-foreground/10">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Закрыть"
              className="absolute top-3 right-3 z-10"
            >
              <X aria-hidden="true" />
            </Button>
          </DialogClose>
          <div className="no-scrollbar flex-1 overflow-y-auto p-4 pr-14 sm:p-6 sm:pr-16">
            {children}
          </div>
        </div>
      </motion.div>
    </DialogContent>
  );
}
