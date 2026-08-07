import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { useCreateWishlistItem } from "@/entities/wishlist-item/model/item.mutations";
import {
  CreateWishlistItemSchema,
  type CreateWishlistItemType,
} from "@/entities/wishlist-item/model/item.validation";
import { useMyWishlists } from "@/entities/wishlist/model/wishlist.hooks";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";

type WishlistItemCreateDialogProps = {
  wishlistId: string;
  open: boolean;
  onClose: () => void;
};

export const WishlistItemCreateDialog = memo(function WishlistCreateDialog({
  wishlistId,
  open,
  onClose,
}: WishlistItemCreateDialogProps) {
  const user = useRequiredUser();
  const { data: wishlists } = useMyWishlists();

  const createWishlistItem = useCreateWishlistItem();

  const form = useForm<CreateWishlistItemType>({
    resolver: zodResolver(CreateWishlistItemSchema),
    defaultValues: {
      wishlistId,
      title: "",
      description: "",
      link: "",
      price: null,
      image: "",
    },
  });

  const closeDialog = () => {
    form.reset();
    onClose();
  };

  const handleCreate = async () => {
    if (!user?.id || !form.getValues("wishlistId")) return;

    const data: CreateWishlistItemType = {
      wishlistId: form.getValues("wishlistId"),
      title: form.getValues("title"),
      description: form.getValues("description"),
      link: form.getValues("link"),
      price: Number(form.getValues("price") ?? 0),
      image: "",
    };
    try {
      createWishlistItem.mutateAsync(data);
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
      <DialogCustomOverlay />

      <DialogCustomContent>
        <DialogHeader className="pb-7">
          <DialogTitle className="font-semibold">Создать подарок</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Заполните данные для нового подарка
          </DialogDescription>
        </DialogHeader>

        <form
          id="wishlist-item-create-form"
          onSubmit={form.handleSubmit(handleCreate)}
          className="mb-5 flex flex-col gap-4"
        >
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
                  id="wishlist-item-create-form-description"
                  placeholder="Описание"
                  autoComplete="off"
                />
              </Field>
            )}
          />

          <Controller
            name="wishlistId"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent position="item-aligned">
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
                  id="wishlist-item-create-form-price"
                  placeholder="Цена"
                  autoComplete="off"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="no-spin pr-8"
                />
                <span className="pointer-events-none absolute top-[5.5px] right-4 text-end text-muted-foreground">
                  ₽
                </span>
              </Field>
            )}
          />
          <Controller
            name="link"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Input
                  {...field}
                  id="wishlist-item-create-form-link"
                  placeholder="Ссылка на подарок"
                  autoComplete="off"
                />
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
                      <img src={previewUrl} alt="Предпросмотр изображения желания" className="h-48 w-full rounded-2xl object-cover" />
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

        <DialogFooter>
          <Button variant="outline" className="w-full sm:w-26" onClick={closeDialog}>
            Отмена
          </Button>
          <Button
            type="submit"
            form="wishlist-item-create-form"
            className="w-full sm:w-26"
            disabled={createWishlistItem.isPending}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogCustomContent>
    </Dialog>
  );
});
