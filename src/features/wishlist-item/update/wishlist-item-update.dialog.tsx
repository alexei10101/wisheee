import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { memo, useEffect } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import type { WishlistItem } from "@/entities/wishlist-item/model/item";
import { useUpdateWishlistItem } from "@/entities/wishlist-item/model/item.mutations";
import { Spinner } from "@/shared/ui/kit/spinner";
import { UpdateWishlistItemSchema, type UpdateWishlistItemType } from "@/entities/wishlist-item/model/item.validation";
import { useMyWishlists } from "@/entities/wishlist/model/wishlist.hooks";

type WishlistItemUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlistItem: WishlistItem;
};

export const WishlistItemUpdateDialog = memo(function WishlistItemUpdateDialog({
  open,
  onClose,
  wishlistItem,
}: WishlistItemUpdateDialogProps) {
  const { data: wishlists } = useMyWishlists();
  const updateWishlistItem = useUpdateWishlistItem();

  const form = useForm<UpdateWishlistItemType>({
    resolver: zodResolver(UpdateWishlistItemSchema),
    defaultValues: {
      wishlistId: wishlistItem.wishlistId,
      title: "",
      description: "",
      link: "",
      price: null,
    },
  });

  useEffect(() => {
    if (open && wishlistItem) {
      form.reset({
        wishlistId: wishlistItem.wishlistId,
        title: wishlistItem.title,
        description: wishlistItem.description,
        link: wishlistItem.link,
        price: wishlistItem.price,
      });
    }
  }, [open, wishlistItem, form]);

  // useEffect(() => {
  //   if (open && wishlistItem) {
  //     if (!wishlistItem.image_url) return;
  //     urlToFile(wishlistItem.image_url).then((file) => {
  //       form.setValue("image", file);
  //     });
  //   }
  // }, [open, wishlistItem]);

  const handleUpdate = async () => {
    const data = getUpdatedFields();
    if ((Object.keys(data).length === 0 && !form.formState.dirtyFields.image) || !wishlistItem) return onClose();

    try {
      await updateWishlistItem.mutateAsync({
        itemId: wishlistItem.id,
        previousWishlistId: wishlistItem.wishlistId,
        data,
      });
    } catch (error) {
      updateWishlistItem.mutateAsync({ itemId: wishlistItem.id, data, previousWishlistId: wishlistItem.wishlistId });
    } finally {
      onClose();
    }

    // try {
    //   const imageValue = form.getValues().image;

    //   if (imageValue instanceof File) {
    //     const uploadResult = await wishlistItemService.uploadImage(user.id, wishlistItem.id, imageValue);

    //     if (uploadResult.error) {
    //       throw new Error(uploadResult.error);
    //     }

    //     data.image_url = `${uploadResult.result?.publicUrl}?t=${Date.now()}`;
    //   }

    //   if (imageValue === null) {
    //     wishlistItemService.removeImage(user.id, wishlistItem.id);
    //     data.image_url = null;
    //   }

    //   await updateWishlistItem.mutateAsync({ data });
    // } catch (error) {
    //   console.log("Ошибка при обновлении подарка: " + ((error as Error).message ?? "Неизвестная ошибка"));
    // } finally {
    //   onClose();
    // }
  };

  const getUpdatedFields = (): UpdateWishlistItemType => {
    const formValues = form.getValues();
    const dirtyFields = form.formState.dirtyFields;

    const updateData = {} as UpdateWishlistItemType;

    if (dirtyFields.wishlistId) updateData.wishlistId = formValues.wishlistId;
    if (dirtyFields.title) updateData.title = formValues.title;
    if (dirtyFields.description) updateData.description = formValues.description;
    if (dirtyFields.link) updateData.link = formValues.link;
    if (dirtyFields.price) updateData.price = Number(formValues.price ?? 0);
    return updateData;
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
          <DialogDescription className="text-sm text-muted-foreground">Вы можете изменить информацию о подарке</DialogDescription>
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
            name="wishlistId"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent position="item-aligned" className="z-100">
                    <SelectGroup>
                      <SelectLabel>Мои вишлисты</SelectLabel>
                      {wishlists?.map((wishlist) => (
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
          {/* <Controller
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
          /> */}
        </form>

        <DialogFooter className="mt-3">
          <Button variant="outline" className="sm:w-26" onClick={() => onClose()}>
            Отмена
          </Button>
          <Button type="submit" form="wishlist-item-update-form" className="sm:w-26" disabled={updateWishlistItem.isPending}>
            {updateWishlistItem.isPending ? <Spinner /> : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogCustomContent>
    </Dialog>
  );
});
