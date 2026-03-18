import { useAuth } from "@/entities/user/model/use-auth";
import { useCreateWishlistItem } from "@/entities/wishlist-item/model/wishlist-item.mutations";
import { useWishlist, useWishlists } from "@/entities/wishlist/model/wishlist.queries";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type WishlistItemCreateDialogProps = {
  wishlistId: string;
  open: boolean;
  onClose: () => void;
};

type FormValues = z.infer<typeof wishlistItemSchema>;
const wishlistItemSchema = z.object({
  wishlist_id: z.string(),
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  link: z.string(),
  price: z.number(),
});

export const WishlistItemCreateDialog = memo(function WishlistCreateDialog({ wishlistId, open, onClose }: WishlistItemCreateDialogProps) {
  const { user } = useAuth();
  const { data: activeWishlist } = useWishlist(wishlistId);
  const { data: wishlists } = useWishlists(user?.id);

  const createWishlistItem = useCreateWishlistItem();

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistItemSchema),
    defaultValues: {
      wishlist_id: activeWishlist?.id,
      title: "",
      description: "",
      link: "",
      price: 0,
    },
  });

  const closeDialog = () => {
    form.reset();
    onClose();
  };

  const handleCreate = async () => {
    if (!user?.id || !form.getValues("wishlist_id")) return;

    const data = {
      wishlist_id: form.getValues("wishlist_id"),
      title: form.getValues("title"),
      description: form.getValues("description"),
      link: form.getValues("link"),
      price: Number(form.getValues("price")) ?? 0,
    };

    try {
      createWishlistItem.mutateAsync({ data });
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
      }}>
      <DialogPortal>
        <DialogCustomOverlay />

        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Создать подарок</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Заполните данные для нового подарка</DialogDescription>
          </DialogHeader>

          <form id="wishlist-item-create-form" onSubmit={form.handleSubmit(handleCreate)} className="flex flex-col gap-4 mb-5">
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
                  <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите вишлист" />
                    </SelectTrigger>

                    <SelectContent>
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
          </form>

          <DialogFooter>
            <Button variant="outline" className="w-26" onClick={closeDialog}>
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
});
