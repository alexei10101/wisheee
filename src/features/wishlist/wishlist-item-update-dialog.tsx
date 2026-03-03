import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { memo, useEffect } from "react";
import type { WishlistItem } from "@/shared/types/wishlistItem";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { UserAuth } from "@/app/auth-context";

type WishlistItemUpdateDialogProps = {
  wishlistItem: WishlistItem;
  open: boolean;
  resolver: {
    resolve: ({}: Partial<WishlistItem>) => void;
    reject: () => void;
  } | null;
};

type FormValues = z.infer<typeof wishlistItemSchema>;
const wishlistItemSchema = z.object({
  wishlist_id: z.string(),
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  link: z.string(),
  price: z.number().nullable(),
});

function WishlistItemUpdateDialog({ wishlistItem, open, resolver }: WishlistItemUpdateDialogProps) {
  const { profile } = UserAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistItemSchema),
  });

  useEffect(() => {
    if (open && wishlistItem) {
      form.reset({
        wishlist_id: wishlistItem.wishlist_id,
        title: wishlistItem.title,
        description: wishlistItem.description ?? "",
        link: wishlistItem.link ?? "",
        price: wishlistItem.price ?? null,
      });
    }
  }, [open, wishlistItem, form]);

  const handleFormSubmit = () => {
    const formValues = form.getValues();
    const dirtyFields = form.formState.dirtyFields;

    const newData = {} as Partial<WishlistItem>;

    if (dirtyFields.title) {
      newData.title = formValues.title;
    }
    if (dirtyFields.description) {
      newData.description = formValues.description;
    }
    if (dirtyFields.link) {
      newData.link = formValues.link;
    }
    if (dirtyFields.link) {
      newData.link = formValues.link;
    }
    if (dirtyFields.price) {
      newData.price = Number(formValues.price ?? 0);
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
            <DialogTitle className="font-semibold">Создать подарок</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Заполните данные для нового подарка</DialogDescription>
          </DialogHeader>

          <form id="wishlist-item-create-form" onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 mb-5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="wishlist-item-create-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Название подарка"
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
                  <Input {...field} id="wishlist-item-create-form-description" placeholder="Описание" autoComplete="off" />
                </Field>
              )}
            />

            <Controller
              name="wishlist_id"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите вишлист" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Мои вишлисты</SelectLabel>
                        {profile?.wishlists.map((wishlist) => (
                          <SelectItem key={wishlist.id} value={wishlist.id}>
                            {wishlist.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field }) => (
                <Field className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    id="wishlist-item-create-form-price"
                    placeholder="Цена"
                    autoComplete="off"
                    value={field.value === 0 || field.value === null ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    className="no-spin pr-8"
                  />
                  <span className="absolute right-4 top-[5.5px] pointer-events-none text-end text-muted-foreground">₽</span>
                </Field>
              )}
            />
            <Controller
              name="link"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Input {...field} id="wishlist-item-create-form-link" placeholder="Ссылка на подарок" autoComplete="off" />
                </Field>
              )}
            />
          </form>

          <DialogFooter>
            <Button variant="outline" className="w-26" onClick={() => resolver?.reject()}>
              Отмена
            </Button>
            <Button type="submit" form="wishlist-item-create-form" className="w-26">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
}

export default memo(WishlistItemUpdateDialog);
