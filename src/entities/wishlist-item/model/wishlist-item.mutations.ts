import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistItemService } from "./wishlist-item.service";
import type { WishlistItem } from "./wishlist-item";
import { unwrap } from "@/shared/api/helper-unwrap";
import { wishlistKeys } from "@/entities/wishlist/model/wishlist.queries";
import type { WishlistWithItems } from "@/entities/wishlist/model/wishlist";

export const useCreateWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: Omit<WishlistItem, "id"> }) => {
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
    mutationFn: async ({ wishlistItemId }: { wishlistId: string; wishlistItemId: string }) => {
      const result = await wishlistItemService.delete(wishlistItemId);
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
