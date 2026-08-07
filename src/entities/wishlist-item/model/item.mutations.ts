import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WishlistItem } from "./item";
import { toast } from "sonner";
import { wishlistItemRepository } from "../api/item.repository";
import { wishlistItemsKeys } from "./item.queries";
import type { UpdateWishlistItemType } from "./item.validation";

export const useCreateWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistItemRepository.create,
    onMutate: () => {
      const toastId = toast.loading("Создание желания...");
      return { toastId };
    },
    onSuccess: (created, _, ctx) => {
      toast.success("Желание добавлено", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData<WishlistItem[]>(wishlistItemsKeys.list(created.wishlistId), (old) =>
        old ? [created, ...old] : [created],
      );
    },
    onError: (_, __, ctx) => {
      toast.error("Ошибка добавления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId }: { itemId: string }) => wishlistItemRepository.delete(itemId),
    onMutate: () => {
      const toastId = toast.loading("Удаление желания...");
      return { toastId };
    },
    onSuccess: (deleted, variables, ctx) => {
      toast.success("Желание удалено", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData<WishlistItem[]>(
        wishlistItemsKeys.list(deleted.wishlistId),
        (old = []) => old.filter((item) => item.id !== variables.itemId),
      );
    },
    onError: (_, __, ctx) => {
      toast.error("Ошибка удаления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useUpdateWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemId,
      data,
    }: {
      itemId: string;
      data: UpdateWishlistItemType;
      previousWishlistId: string;
    }) => wishlistItemRepository.update(itemId, data),
    onMutate: () => {
      const toastId = toast.loading("Обновление желания...");
      return { toastId };
    },
    onSuccess: (updated, variables, ctx) => {
      if (!updated) return;

      toast.success("Ваше желание успешно обновлено", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });

      if (variables.previousWishlistId !== updated.wishlistId) {
        queryClient.setQueryData<WishlistItem[]>(
          wishlistItemsKeys.list(variables.previousWishlistId),
          (items = []) => items.filter((item) => item.id !== updated.id),
        );

        queryClient.setQueryData<WishlistItem[]>(
          wishlistItemsKeys.list(updated.wishlistId),
          (items = []) => [updated, ...items.filter((item) => item.id !== updated.id)],
        );
      } else {
        queryClient.setQueryData<WishlistItem[]>(
          wishlistItemsKeys.list(updated.wishlistId),
          (items = []) => items.map((item) => (item.id === updated.id ? updated : item)),
        );
      }
    },
    onError: (_, __, ctx) => {
      toast.error("Ошибка обновления", {
        id: ctx?.toastId,
      });
    },
  });
};

// export const useReserveWishlistItem = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ userId, wishlistItemId, accessToken }: { userId: string; wishlistItemId: string; accessToken: string }) => {
//       const reserved = await wishlistItemService.reserve(userId, wishlistItemId, accessToken);
//       return unwrapApiResponse(reserved);
//     },
//     onMutate: () => {
//       const toastId = toast.loading("Обновляем бронь…");
//       return { toastId };
//     },
//     onSuccess: (reserved, _vars, ctx) => {
//       const message = reserved.reserver ? "Товар забронирован" : "Бронь снята";

//       toast.success(message, {
//         id: ctx.toastId,
//         action: {
//           label: "Ок",
//           onClick: () => {},
//         },
//       });
//       queryClient.setQueryData(wishlistKeys.detail(reserved.wishlist_id), (old: WishlistWithItems | undefined) => {
//         if (!old) return old;

//         return {
//           ...old,
//           wishlist_items: old.wishlist_items.map((w) => (w.id === reserved.id ? reserved : w)),
//         };
//       });
//     },
//     onError: (err: any, _vars, ctx) => {
//       const message = err?.code === "ALREADY_RESERVED" ? "Товар уже забронирован другим пользователем" : "Не удалось обновить бронь";

//       toast.error(message, { id: ctx?.toastId });
//     },
//   });
// };

// export const useCreateWishlistItemWithImage = (userId?: string) => {
//   const createItem = useCreateWishlistItem();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ data, file }: { data: Omit<WishlistItem, "id" | "image_url">; file?: File | null }) => {
//       const created = await createItem.mutateAsync({ data });

//       if (file && userId) {
//         const upload = await wishlistItemService.uploadImage(userId, created.id, file);

//         const { publicUrl } = unwrap(upload);

//         await wishlistItemService.update({
//           id: created.id,
//           image_url: publicUrl,
//         });

//         queryClient.setQueryData(wishlistKeys.detail(data.wishlist_id), (old: WishlistWithItems | undefined) => {
//           if (!old) return old;

//           return {
//             ...old,
//             wishlist_items: old.wishlist_items.map((i) => (i.id === created.id ? { ...i, image_url: publicUrl } : i)),
//           };
//         });
//       }

//       return created;
//     },
//   });
// };
