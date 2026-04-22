import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "./wishlist.service";
import { unwrap } from "@/shared/api/helper-unwrap";
import type { Wishlist, WishlistWithItems } from "./wishlist";
import { wishlistKeys } from "./wishlist.queries";
import { toast } from "sonner";

export const useCreateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Omit<Wishlist, "user_id" | "id"> }) => {
      const result = await wishlistService.create(userId, data);
      return unwrap(result);
    },
    onSuccess: (created, variables) => {
      queryClient.setQueryData(wishlistKeys.list(variables.userId), (old: Wishlist[] = []) => [created, ...old]);
    },
  });
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, wishlistId }: { userId: string; wishlistId: string }) => {
      const { error } = await wishlistService.delete(userId, wishlistId);
      if (error) throw error;
      return wishlistId;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(wishlistKeys.list(variables.userId), (old: Wishlist[] = []) =>
        old.filter((w) => w.id !== variables.wishlistId),
      );
    },
  });
};

export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, wishlistId, updatedFields }: { userId: string; wishlistId: string; updatedFields: Partial<Wishlist> }) => {
      const result = await wishlistService.update(userId, wishlistId, updatedFields);
      return unwrap(result);
    },
    onMutate: () => {
      const toastId = toast.loading("Обновление вишлиста...");
      return { toastId };
    },
    onSuccess: (updated, variables, ctx) => {
      toast.success("Вишлист успешно обновлен", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(wishlistKeys.list(variables.userId), (old: Wishlist[] = []) =>
        old.map((w) => (w.id === updated.id ? updated : w)),
      );
      queryClient.setQueryData(wishlistKeys.detail(variables.wishlistId), (old: WishlistWithItems) => ({ ...old, ...updated }));
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка обновления", {
        id: ctx?.toastId,
      });
    },
  });
};
