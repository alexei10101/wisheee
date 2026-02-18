import { Button } from "@/shared/ui/kit/button";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Wishlist } from "@/shared/types/wishlist";

type WishlistDialogProps = {
  onSubmit: (data: Omit<Wishlist, "user_id" | "id">) => Promise<void>;
  profileId: string | undefined;
};

// Dialog form
type FormValues = z.infer<typeof wishlistSchema>;
const wishlistSchema = z.object({
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  isPublic: z.boolean(),
});

// Fade dialog in
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};
const contentVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function WishlistDialog({ onSubmit, profileId }: WishlistDialogProps) {
  if (!profileId) return;
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
    },
  });

  const handleFormSubmit = () => {
    setOpen(false);
    onSubmit({
      title: form.getValues("title"),
      description: form.getValues("description"),
      is_public: form.getValues("isPublic"),
    });
  };

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}>
      <DialogTrigger asChild>
        <Button>+</Button>
      </DialogTrigger>

      <DialogPortal>
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

        <DialogContent asChild>
          <motion.div
            className="fixed top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}>
            <DialogHeader className="pb-7">
              <DialogTitle className="font-semibold">Создать вишлист</DialogTitle>
              <DialogDescription className="text-sm text-gray-800">Заполните данные для нового списка желаний</DialogDescription>
            </DialogHeader>

            <form id="wishlist-form" onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="wishlist-form-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Название"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Input {...field} id="wishlist-form-description" placeholder="Описание" autoComplete="off" />
                  </Field>
                )}
              />
              <Controller
                name="isPublic"
                control={form.control}
                render={({ field }) => (
                  <div className="leading-none text-sm flex pe-3 py-1 gap-2 text-[#0a0a0a]">
                    <input
                      id="wishlist-form-isPublic"
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label htmlFor="wishlist-form-isPublic" className="flex cursor-pointer">
                      Видят все
                    </label>
                  </div>
                )}
              />
            </form>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-26">
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" form="wishlist-form" className="w-26">
                Сохранить
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
