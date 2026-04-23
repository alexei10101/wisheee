import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { memo, useEffect } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";
import { useUpdateWishlistItem } from "@/entities/wishlist-item/model/wishlist-item.mutations";
import { urlToFile } from "@/shared/utils/convert-image";
import { Label } from "@/shared/ui/kit/label";
import { X } from "lucide-react";
import { useCurrentUser } from "@/entities/user/model/use-current-user";

type WishlistItemUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlistItem: WishlistItem;
};

type FormValues = z.infer<typeof wishlistItemSchema>;
const wishlistItemSchema = z.object({
  wishlist_id: z.string(),
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  link: z.string(),
  price: z.number().nullable(),
  image: z.union([z.instanceof(File), z.null()]).optional(),
});

export const WishlistItemUpdateDialog = memo(function WishlistItemUpdateDialog({
  open,
  onClose,
  wishlistItem,
}: WishlistItemUpdateDialogProps) {
  const { data: user } = useCurrentUser();
  const updateWishlistItem = useUpdateWishlistItem(wishlistItem.wishlist_id);

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistItemSchema),
    defaultValues: {
      wishlist_id: wishlistItem.wishlist_id,
      title: "",
      description: "",
      link: "",
      price: null,
      image: null,
    },
  });

  useEffect(() => {
    if (open && wishlistItem) {
      form.reset({
        title: wishlistItem.title,
        description: wishlistItem.description,
        link: wishlistItem.link,
        price: wishlistItem.price,
      });
    }
  }, [open, wishlistItem, form]);

  useEffect(() => {
    if (open && wishlistItem) {
      if (!wishlistItem.image_url) return;
      urlToFile(wishlistItem.image_url).then((file) => {
        form.setValue("image", file);
      });
    }
  }, [open, wishlistItem]);

  const handleUpdate = async () => {
    if (!user?.id || !wishlistItem.id) return;
    const updatedFields = getUpdatedFields();
    if (!updatedFields || !wishlistItem) return onClose();

    const data = {
      id: wishlistItem.id,
      ...updatedFields,
    };

    try {
      updateWishlistItem.mutateAsync({ data });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const getUpdatedFields = () => {
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
    if (dirtyFields.wishlist_id) {
      newData.wishlist_id = formValues.wishlist_id;
    }
    if (dirtyFields.price) {
      newData.price = Number(formValues.price ?? 0);
    }
    return newData;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}>
      <DialogCustomOverlay />

      <DialogCustomContent>
        <DialogHeader className="pb-7">
          <DialogTitle className="font-semibold">Редактирование подарка</DialogTitle>
          <DialogDescription className="text-sm text-gray-800">Вы можете изменить информацию о подарке</DialogDescription>
        </DialogHeader>

        <form id="wishlist-item-update-form" onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col gap-4 mb-5">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="wishlist-item-update-form-title"
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
                <Input {...field} id="wishlist-item-update-form-description" placeholder="Описание" autoComplete="off" />
              </Field>
            )}
          />

          <Controller
            name="wishlist_id"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent position="item-aligned" className="z-100">
                    <SelectGroup>
                      <SelectLabel>Мои вишлисты</SelectLabel>
                      {user?.wishlists?.map((wishlist) => (
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
                  id="wishlist-item-update-form-price"
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
                <Input {...field} id="wishlist-item-update-form-link" placeholder="Ссылка на подарок" autoComplete="off" />
              </Field>
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field }) => {
              const file: File | null = field.value ?? null;
              const previewUrl = file ? URL.createObjectURL(file) : null;

              return (
                <Field className="w-full relative group">
                  <Label className="cursor-pointer block w-full">
                    <span className="block mb-2 ml-0.5">Выберите изображение</span>

                    {previewUrl ? (
                      <img src={previewUrl} className="w-full h-48 object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-48 rounded-xl border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                        PNG, JPEG или WEBP
                      </div>
                    )}

                    <Input
                      type="file"
                      hidden
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        field.onChange(file);
                      }}
                    />
                  </Label>

                  {file && (
                    <Button
                      className="-my-3 sm:my-auto sm:absolute sm:bottom-0 sm:opacity-0 group-hover:opacity-100"
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        field.onChange(null);
                        const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
                        if (input) input.value = "";
                      }}>
                      <X />
                    </Button>
                  )}
                </Field>
              );
            }}
          />
        </form>

        <DialogFooter className="mt-3">
          <Button variant="outline" className="sm:w-26" onClick={() => onClose()}>
            Отмена
          </Button>
          <Button type="submit" form="wishlist-item-update-form" className="sm:w-26">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogCustomContent>
    </Dialog>
  );
});
