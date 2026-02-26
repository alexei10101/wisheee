import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogCustomContent, DialogCustomOverlay } from "./ui/dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import type { Wishlist } from "@/shared/types/wishlist";
import { memo, useEffect } from "react";

type WishlistEditDialogProps = {
  open: boolean;
  data: Partial<Wishlist> | null;
  resolver: {
    resolve: ({}: Partial<Wishlist>) => void;
    reject: () => void;
  } | null;
};

type FormValues = z.infer<typeof wishlistSchema>;
const wishlistSchema = z.object({
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  isPublic: z.boolean(),
});

function WishlistEditDialog({ open, data, resolver }: WishlistEditDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
    },
  });

  useEffect(() => {
    if (open && data) {
      form.reset({
        title: data.title ?? "",
        description: data.description ?? "",
        isPublic: data.is_public,
      });
    }
  }, [data, open]);

  const handleFormSubmit = () => {
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

    resolver?.resolve(newData);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resolver?.reject();
        }
      }}>
      <DialogPortal>
        <DialogCustomOverlay />
        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Изменение вишлиста</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Вы можете изменить информацию о вишлисте</DialogDescription>
          </DialogHeader>
          {data && resolver && (
            <form id="wishlist-edit-form" onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
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
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-26" onClick={() => resolver?.reject()}>
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit" form="wishlist-edit-form" className="w-26">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
}

export default memo(WishlistEditDialog);
