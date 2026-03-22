import { useMutation, useQueryClient } from "@tanstack/react-query";
import { friendsRequestService } from "./friend-request.service";
import type { AppNotification } from "@/entities/notification/model/notification";
import type { FriendRequestMetadata } from "./friend-request";
import { notificationKeys } from "@/entities/notification/model/notification.queries";
import { friendsKeys } from "@/entities/friend/model/friend.queries";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ senderId, receiverId, metadata }: { senderId: string; receiverId: string; metadata: FriendRequestMetadata }) =>
      friendsRequestService.sendFriendRequest(senderId, receiverId, metadata),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.friendRequest(variables.receiverId),
      });
    },
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ senderId, receiverId, requestId }: { senderId: string; receiverId: string; requestId: string }) =>
      friendsRequestService.acceptFriendRequest(senderId, receiverId, requestId),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(notificationKeys.friendRequest(variables.receiverId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_accepted" } : n)),
      );
      // кто принимает - у того обновляется, у другого - нет
      queryClient.invalidateQueries({
        queryKey: friendsKeys.list(variables.senderId),
      });
    },
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ senderId, receiverId, requestId }: { senderId: string; receiverId: string; requestId: string }) =>
      friendsRequestService.rejectFriendRequest(senderId, receiverId, requestId),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(notificationKeys.friendRequest(variables.receiverId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_rejected" } : n)),
      );
    },
  });
};
