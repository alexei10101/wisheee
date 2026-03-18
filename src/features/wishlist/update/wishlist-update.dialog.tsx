import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { memo, useEffect } from "react";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { useUpdateWishlist } from "@/entities/wishlist/model/wishlist.mutations";
import { useAuth } from "@/entities/user/model/use-auth";

type WishlistUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlist: Wishlist;
};

type FormValues = z.infer<typeof wishlistSchema>;
const wishlistSchema = z.object({
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  isPublic: z.boolean(),
});

export const WishlistUpdateDialog = memo(function WishlistUpdateDialog({ open, onClose, wishlist }: WishlistUpdateDialogProps) {
  const { user } = useAuth();
  const updateWishlist = useUpdateWishlist();

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
    },
  });

  useEffect(() => {
    if (open && wishlist) {
      form.reset({
        title: wishlist.title ?? "",
        description: wishlist.description ?? "",
        isPublic: wishlist.is_public ?? true,
      });
    }
  }, [wishlist, open, form]);

  const handleUpdate = async () => {
    if (!user?.id || !wishlist.id) return;

    const updatedFields = getUpdatedFields();
    if (!updatedFields) return onClose();

    try {
      updateWishlist.mutateAsync({ userId: user.id, wishlistId: wishlist.id, updatedFields });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const getUpdatedFields = () => {
    const formValues = form.getValues();
    const dirtyFields = form.formState.dirtyFields;

    const newData = {} as Partial<Wishlist>;
    if (dirtyFields.title) {
      newData.title = formValues.title;
    }

    if (dirtyFields.description) {
      newData.description = formValues.description;
    }

    if (dirtyFields.isPublic) {
      newData.is_public = formValues.isPublic;
    }

    if (Object.keys(newData).length === 0) {
      return null;
    }

    return newData;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}>
      <DialogPortal>
        <DialogCustomOverlay />
        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Изменение вишлиста</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Вы можете изменить информацию о вишлисте</DialogDescription>
          </DialogHeader>
          {wishlist && (
            <form id="wishlist-edit-form" onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col gap-4">
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
                  <Field>
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
                  </Field>
                )}
              />
            </form>
          )}

          <DialogFooter>
            <Button variant="outline" className="w-26" onClick={() => onClose()}>
              Отмена
            </Button>
            <Button type="submit" form="wishlist-edit-form" className="w-26">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
