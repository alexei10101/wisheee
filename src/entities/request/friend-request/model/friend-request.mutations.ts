import { useMutation, useQueryClient } from "@tanstack/react-query";
import { friendsRequestService } from "./friend-request.service";
import type { AppNotification } from "@/entities/notification/model/notification";
import type { FriendRequestMetadata } from "./friend-request";
import { notificationKeys } from "@/entities/notification/model/notification.queries";
import { friendsKeys } from "@/entities/friend/model/friend.queries";
import { toast } from "sonner";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ senderId, receiverId, metadata }: { senderId: string; receiverId: string; metadata: FriendRequestMetadata }) =>
      friendsRequestService.sendFriendRequest(senderId, receiverId, metadata),
    onMutate: () => {
      const toastId = toast.loading("Отправка запроса...");
      return { toastId };
    },
    onSuccess: (_, variables, ctx) => {
      toast.success("Запрос успешно отправлен", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.friendRequest(variables.receiverId),
      });
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
    mutationFn: ({
      senderId,
      receiverId,
      requestId,
      accessToken,
    }: {
      senderId: string;
      receiverId: string;
      requestId: string;
      accessToken: string;
    }) => friendsRequestService.acceptFriendRequest(senderId, receiverId, requestId, accessToken),
    onMutate: () => {
      const toastId = toast.loading("Принимаем заявку в друзья…");
      return { toastId };
    },
    onSuccess: (_, variables, ctx) => {
      toast.success("Заявка принята", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(notificationKeys.friendRequest(variables.senderId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_accepted" } : n)),
      );
      queryClient.invalidateQueries({
        queryKey: friendsKeys.list(variables.senderId),
      });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      senderId,
      receiverId,
      requestId,
      accessToken,
    }: {
      senderId: string;
      receiverId: string;
      requestId: string;
      accessToken: string;
    }) => friendsRequestService.rejectFriendRequest(senderId, receiverId, requestId, accessToken),
    onMutate: () => {
      const toastId = toast.loading("Отклоняем заявку в друзья…");
      return { toastId };
    },
    onSuccess: (_, variables, ctx) => {
      toast.success("Заявка отклонена", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(notificationKeys.friendRequest(variables.senderId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_rejected" } : n)),
      );
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка", {
        id: ctx?.toastId,
      });
    },
  });
};
