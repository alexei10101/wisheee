import { UserAuth } from "@/app/contexts/auth.context";
import { useCreateWishlist } from "@/entities/wishlist/model/wishlist.mutations";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type WishlistCreateDialogProps = {
  open: boolean;
  onClose: () => void;
};

type FormValues = z.infer<typeof wishlistSchema>;
const wishlistSchema = z.object({
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  isPublic: z.boolean(),
});

export const WishlistCreateDialog = memo(function WishlistCreateDialog({ open, onClose }: WishlistCreateDialogProps) {
  const { user } = UserAuth();
  const createWishlist = useCreateWishlist();

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
    },
  });

  const closeDialog = () => {
    form.reset();
    onClose();
  };

  const handleCreate = async () => {
    if (!user?.id) return;

    const data = { title: form.getValues("title"), description: form.getValues("description"), is_public: form.getValues("isPublic") };

    try {
      await createWishlist.mutateAsync({ userId: user.id, data });
    } catch (error) {
      // TODO: sonner and console
      console.log(error);
    } finally {
      closeDialog();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) closeDialog();
      }}>
      <DialogPortal>
        <DialogCustomOverlay />

        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Создать вишлист</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Заполните данные для нового списка желаний</DialogDescription>
          </DialogHeader>

          <form id="wishlist-create-form" onSubmit={form.handleSubmit(handleCreate)} className="flex flex-col gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="wishlist-create-form-title"
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
                  <Input {...field} id="wishlist-create-form-description" placeholder="Описание" autoComplete="off" />
                </Field>
              )}
            />
            <Controller
              name="isPublic"
              control={form.control}
              render={({ field }) => (
                <div className="leading-none text-sm flex pe-3 py-1 gap-2 text-[#0a0a0a]">
                  <input
                    id="wishlist-create-form-is-public"
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label htmlFor="wishlist-create-form-is-public" className="flex cursor-pointer">
                    Видят все
                  </label>
                </div>
              )}
            />
          </form>

          <DialogFooter>
            <Button variant="outline" className="w-26" onClick={closeDialog}>
              Отмена
            </Button>
            <Button type="submit" form="wishlist-create-form" className="w-26" disabled={createWishlist.isPending}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
