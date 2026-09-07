import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { friendRequestRepository } from "../api/friend-request.repository";
import { friendKeys } from "@/entities/friend/model/friend.queries";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendRequestRepository.createRequest,
    onMutate: () => {
      const toastId = toast.loading("Отправка запроса...");
      return { toastId };
    },
    onSuccess: async (_, __, ctx) => {
      toast.success("Запрос успешно отправлен", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      await queryClient.invalidateQueries({ queryKey: friendKeys.me });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка отправки запроса", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendRequestRepository.acceptRequest,
    onMutate: () => {
      const toastId = toast.loading("Принимаем заявку в друзья…");
      return { toastId };
    },
    onSuccess: async (_, __, ctx) => {
      toast.success("Заявка принята", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      await queryClient.invalidateQueries({ queryKey: friendKeys.me });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка добавления", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useRejectFriendRequest = () => {
  return useMutation({
    mutationFn: friendRequestRepository.rejectRequest,
    onMutate: () => {
      const toastId = toast.loading("Отклоняем заявку в друзья…");
      return { toastId };
    },
    onSuccess: (_, __, ctx) => {
      toast.success("Заявка отклонена", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка", {
        id: ctx?.toastId,
      });
    },
  });
};
