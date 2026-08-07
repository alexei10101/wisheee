import { useCreateWishlist } from "@/entities/wishlist/model/wishlist.mutations";
import {
  CreateWishlistSchema,
  type CreateWishlistType,
} from "@/entities/wishlist/model/wishlist.validation";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";

type WishlistCreateDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const WishlistCreateDialog = memo(function WishlistCreateDialog({
  open,
  onClose,
}: WishlistCreateDialogProps) {
  const createWishlist = useCreateWishlist();

  const form = useForm<CreateWishlistType>({
    resolver: zodResolver(CreateWishlistSchema),
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
    const createData = {
      title: form.getValues("title"),
      description: form.getValues("description"),
      is_public: form.getValues("isPublic"),
    };

    try {
      await createWishlist.mutateAsync(createData);
    } catch (error) {
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
      }}
    >
      <DialogPortal>
        <DialogCustomOverlay />

        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Создать вишлист</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Заполните данные для нового списка желаний
            </DialogDescription>
          </DialogHeader>

          <form
            id="wishlist-create-form"
            onSubmit={form.handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
          >
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
                  {fieldState.invalid && (
                    <FieldError className="text-sm text-destructive" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Input
                    {...field}
                    id="wishlist-create-form-description"
                    placeholder="Описание"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
            <Controller
              name="isPublic"
              control={form.control}
              render={({ field }) => (
                <div className="flex gap-2 py-1 pe-3 text-sm leading-none text-foreground">
                  <input
                    id="wishlist-create-form-is-public"
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label
                    htmlFor="wishlist-create-form-is-public"
                    className="flex flex-1 cursor-pointer"
                  >
                    Видят все
                  </label>
                </div>
              )}
            />
          </form>

          <DialogFooter className="mt-3">
            <Button variant="outline" className="sm:w-26" onClick={closeDialog}>
              Отмена
            </Button>
            <Button
              type="submit"
              form="wishlist-create-form"
              className="sm:w-26"
              disabled={createWishlist.isPending}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
