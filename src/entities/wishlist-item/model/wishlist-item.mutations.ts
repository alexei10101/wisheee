import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistItemService } from "./wishlist-item.service";
import type { WishlistItem } from "./wishlist-item";
import { unwrap, unwrapApiResponse } from "@/shared/api/helper-unwrap";
import { wishlistKeys } from "@/entities/wishlist/model/wishlist.queries";
import type { WishlistWithItems } from "@/entities/wishlist/model/wishlist";
import { toast } from "sonner";

export const useCreateWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: Omit<WishlistItem, "id" | "image_url"> }) => {
      const result = await wishlistItemService.create(data);
      return unwrap(result);
    },
    onSuccess: (created, variables) => {
      queryClient.setQueryData(wishlistKeys.detail(variables.data.wishlist_id), (old: WishlistWithItems | undefined) => {
        if (!old) return old;

        return { ...old, wishlist_items: [created, ...(old.wishlist_items ?? [])] };
      });
    },
  });
};

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ wishlistItemId, userId }: { wishlistId: string; wishlistItemId: string; userId: string }) => {
      const result = await wishlistItemService.delete(userId, wishlistItemId);
      return unwrap(result);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(wishlistKeys.detail(variables.wishlistId), (old: WishlistWithItems | undefined) => {
        if (!old) return old;

        return {
          ...old,
          wishlist_items: old.wishlist_items.filter((w) => w.id !== variables.wishlistItemId),
        };
      });
    },
  });
};

export const useUpdateWishlistItem = (originalWishlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: Partial<WishlistItem> }) => {
      const result = await wishlistItemService.update(data);
      return unwrap(result);
    },
    onMutate: () => {
      const toastId = toast.loading("Обновление желания...");
      return { toastId };
    },
    onSuccess: (updated, _vars, ctx) => {
      toast.success("Ваше желание успешно обновлено", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      if (updated.wishlist_id === originalWishlistId) {
        queryClient.setQueryData(wishlistKeys.detail(updated.wishlist_id), (old: WishlistWithItems | undefined) => {
          if (!old) return old;
          return {
            ...old,
            wishlist_items: old.wishlist_items.map((w) =>
              w.id === updated.id
                ? {
                    ...w,
                    title: updated.title,
                    description: updated.description,
                    link: updated.link,
                    price: updated.price,
                    image: updated.image_url,
                  }
                : w,
            ),
          };
        });
      } else {
        queryClient.setQueryData(wishlistKeys.detail(originalWishlistId), (old: WishlistWithItems | undefined) => {
          if (!old) return old;
          return {
            ...old,
            wishlist_items: old.wishlist_items.filter((w) => w.id !== updated.id),
          };
        });
        queryClient.setQueryData(wishlistKeys.detail(updated.wishlist_id), (old: WishlistWithItems | undefined) => {
          if (!old) return old;
          return {
            ...old,
            wishlist_items: [
              {
                id: updated.id,
                wishlist_id: updated.wishlist_id,
                title: updated.title,
                description: updated.description,
                link: updated.link,
                price: updated.price,
                image: updated.image_url,
              },
              ...old.wishlist_items,
            ],
          };
        });
      }
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка обновления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useReserveWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, wishlistItemId, accessToken }: { userId: string; wishlistItemId: string; accessToken: string }) => {
      const reserved = await wishlistItemService.reserve(userId, wishlistItemId, accessToken);
      return unwrapApiResponse(reserved);
    },
    onMutate: () => {
      const toastId = toast.loading("Обновляем бронь…");
      return { toastId };
    },
    onSuccess: (reserved, _vars, ctx) => {
      const message = reserved.reserver ? "Товар забронирован" : "Бронь снята";

      toast.success(message, {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(wishlistKeys.detail(reserved.wishlist_id), (old: WishlistWithItems | undefined) => {
        if (!old) return old;

        return {
          ...old,
          wishlist_items: old.wishlist_items.map((w) => (w.id === reserved.id ? reserved : w)),
        };
      });
    },
    onError: (err: any, _vars, ctx) => {
      const message = err?.code === "ALREADY_RESERVED" ? "Товар уже забронирован другим пользователем" : "Не удалось обновить бронь";

      toast.error(message, { id: ctx?.toastId });
    },
  });
};

export const useCreateWishlistItemWithImage = (userId?: string) => {
  const createItem = useCreateWishlistItem();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, file }: { data: Omit<WishlistItem, "id" | "image_url">; file?: File | null }) => {
      const created = await createItem.mutateAsync({ data });

      if (file && userId) {
        const upload = await wishlistItemService.uploadImage(userId, created.id, file);

        const { publicUrl } = unwrap(upload);

        await wishlistItemService.update({
          id: created.id,
          image_url: publicUrl,
        });

        queryClient.setQueryData(wishlistKeys.detail(data.wishlist_id), (old: WishlistWithItems | undefined) => {
          if (!old) return old;

          return {
            ...old,
            wishlist_items: old.wishlist_items.map((i) => (i.id === created.id ? { ...i, image_url: publicUrl } : i)),
          };
        });
      }

      return created;
    },
  });
};
