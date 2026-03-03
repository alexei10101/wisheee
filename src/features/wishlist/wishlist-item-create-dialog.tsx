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

type WishlistItemCreateDialogProps = {
  wishlistId: string;
  open: boolean;
  resolver: {
    resolve: ({}: Omit<WishlistItem, "id">) => void;
    reject: () => void;
  } | null;
};

type FormValues = z.infer<typeof wishlistItemSchema>;
const wishlistItemSchema = z.object({
  wishlist_id: z.string(),
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  // isPublic: z.boolean(),
  link: z.string(),
  price: z.number(),
});

function WishlistItemCreateDialog({ wishlistId, open, resolver }: WishlistItemCreateDialogProps) {
  const { profile } = UserAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistItemSchema),
    defaultValues: {
      wishlist_id: wishlistId ? wishlistId : "",
      title: "",
      description: "",
      // isPublic: true,
      link: "",
      price: 0,
    },
  });

  const handleFormSubmit = () => {
    resolver?.resolve({
      wishlist_id: form.getValues("wishlist_id"),
      title: form.getValues("title"),
      description: form.getValues("description"),
      // is_public: form.getValues("isPublic"),
      link: form.getValues("link"),
      price: Number(form.getValues("price")) ?? 0,
    });
  };

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

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
                    id="wishlist-item-create-form-price"
                    placeholder="Цена"
                    autoComplete="off"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="no-spin pr-8"
                  />
                  <span className="absolute text-end right-4 top-[5.5px] pointer-events-none text-muted-foreground">₽</span>
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
            {/* <Controller
              name="isPublic"
              control={form.control}
              render={({ field }) => (
                <div className="leading-none text-sm flex pe-3 py-1 gap-2 text-[#0a0a0a]">
                  <input
                    id="wishlist-item-create-form-is-public"
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label htmlFor="wishlist-item-create-form-is-public" className="flex cursor-pointer">
                    Видят все
                  </label>
                </div>
              )}
            /> */}
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

export default memo(WishlistItemCreateDialog);
