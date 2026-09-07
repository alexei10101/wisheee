import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { friendsRepository } from "../api/friend.repository";
import { friendKeys } from "./friend.queries";

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendsRepository.deleteFriend,
    onMutate: () => {
      const toastId = toast.loading("Удаление из друзей…");
      return { toastId };
    },
    onSuccess: async (_, __, ctx) => {
      toast.success("Успешно!", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      await queryClient.invalidateQueries({ queryKey: friendKeys.me });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка", {
        id: ctx?.toastId,
      });
    },
  });
};
