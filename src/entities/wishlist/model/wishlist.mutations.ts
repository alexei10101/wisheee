import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistRepository } from "../api/wishlist.repository";
import type { UpdateWishlistType } from "./wishlist.validation";
import { wishlistKeys } from "./wishlist.queries";
import type { Wishlist } from "./wishlist";

export const useCreateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistRepository.create,
    onMutate: () => {
      const toastId = toast.loading("Создание вишлиста...");
      return { toastId };
    },
    onSuccess: (created, _, ctx) => {
      toast.success("Вишлист добавлен", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData<Wishlist[]>(wishlistKeys.my, (old) => (old ? [created, ...old] : [created]));
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка добавления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ wishlistId }: { wishlistId: string }) => wishlistRepository.delete(wishlistId),
    onMutate: () => {
      const toastId = toast.loading("Удаление вишлиста...");
      return { toastId };
    },
    onSuccess: (_, variables, ctx) => {
      toast.success("Вишлист удален", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData<Wishlist[]>(wishlistKeys.my, (old = []) => old.filter((wishlist) => wishlist.id !== variables.wishlistId));
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка удаления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ wishlistId, updateData }: { wishlistId: string; updateData: UpdateWishlistType }) =>
      wishlistRepository.update(wishlistId, updateData),
    onMutate: () => {
      const toastId = toast.loading("Обновление вишлиста...");
      return { toastId };
    },
    onSuccess: (updated, _, ctx) => {
      if (!updated) throw new Error("Ошибка обновления вишлиста.");

      toast.success("Вишлист успешно обновлен", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });

      queryClient.setQueryData<Wishlist[]>(wishlistKeys.my, (old = []) =>
        old.map((wishlist) => (wishlist.id === updated?.id ? updated : wishlist)),
      );
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка обновления", {
        id: ctx?.toastId,
      });
    },
  });
};
