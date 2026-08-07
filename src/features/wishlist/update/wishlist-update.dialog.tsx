import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { memo, useEffect } from "react";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { useUpdateWishlist } from "@/entities/wishlist/model/wishlist.mutations";
import { UpdateWishlistSchema, type UpdateWishlistType } from "@/entities/wishlist/model/wishlist.validation";

type WishlistUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlist: Wishlist;
};

export const WishlistUpdateDialog = memo(function WishlistUpdateDialog({ open, onClose, wishlist }: WishlistUpdateDialogProps) {
  const updateWishlist = useUpdateWishlist();

  const form = useForm<UpdateWishlistType>({
    resolver: zodResolver(UpdateWishlistSchema),
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
        isPublic: wishlist.isPublic ?? true,
      });
    }
  }, [wishlist, open, form]);

  const handleUpdate = async () => {
    if (!wishlist.id) return;

    const updateData = getUpdatedFields();
    if (!updateData) return onClose();

    try {
      updateWishlist.mutateAsync({ wishlistId: wishlist.id, updateData });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const getUpdatedFields = (): UpdateWishlistType | null => {
    const formValues = form.getValues();
    const dirtyFields = form.formState.dirtyFields;

    const newData = {} as UpdateWishlistType;
    if (dirtyFields.title) newData.title = formValues.title;

    if (dirtyFields.description) newData.description = formValues.description;

    if (dirtyFields.isPublic) newData.isPublic = formValues.isPublic;

    if (Object.keys(newData).length === 0) return null;

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
            <DialogTitle className="font-semibold">Редактирование вишлиста</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Вы можете изменить информацию о вишлисте</DialogDescription>
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
                    <div className="flex gap-2 py-1 pe-3 text-sm leading-none text-foreground">
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

          <DialogFooter className="mt-3">
            <Button variant="outline" className="sm:w-26" onClick={() => onClose()}>
              Отмена
            </Button>
            <Button type="submit" form="wishlist-edit-form" className="sm:w-26">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
