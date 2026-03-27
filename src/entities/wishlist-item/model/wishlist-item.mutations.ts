import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistItemService } from "./wishlist-item.service";
import type { WishlistItem } from "./wishlist-item";
import { unwrap } from "@/shared/api/helper-unwrap";
import { wishlistKeys } from "@/entities/wishlist/model/wishlist.queries";
import type { WishlistWithItems } from "@/entities/wishlist/model/wishlist";

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

        return { ...old, wishlist_items: [...(old.wishlist_items ?? []), created] };
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

export const useUpdateWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: WishlistItem }) => {
      const result = await wishlistItemService.update(data);
      return unwrap(result);
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(wishlistKeys.detail(updated.wishlist_id), (old: WishlistWithItems | undefined) => {
        if (!old) return old;

        return {
          ...old,
          wishlist_items: old.wishlist_items.map((w) => (w.id === updated.id ? updated : w)),
        };
      });
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
