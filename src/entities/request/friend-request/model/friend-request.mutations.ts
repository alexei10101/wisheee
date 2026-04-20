import { useMutation, useQueryClient } from "@tanstack/react-query";
import { friendsRequestService } from "./friend-request.service";
import type { AppNotification } from "@/entities/notification/model/notification";
import type { FriendRequestMetadata } from "./friend-request";
import { notificationKeys } from "@/entities/notification/model/notification.queries";
import { friendsKeys } from "@/entities/friend/model/friend.queries";
import type { Session } from "@supabase/supabase-js";

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
    mutationFn: ({
      senderId,
      receiverId,
      requestId,
      session,
    }: {
      senderId: string;
      receiverId: string;
      requestId: string;
      session: Session;
    }) => friendsRequestService.acceptFriendRequest(senderId, receiverId, requestId, session),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(notificationKeys.friendRequest(variables.senderId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_accepted" } : n)),
      );
      queryClient.invalidateQueries({
        queryKey: friendsKeys.list(variables.senderId),
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
      session,
    }: {
      senderId: string;
      receiverId: string;
      requestId: string;
      session: Session;
    }) => friendsRequestService.rejectFriendRequest(senderId, receiverId, requestId, session),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(notificationKeys.friendRequest(variables.senderId), (old: AppNotification[] = []) =>
        old.map((n) => (n.entity_id === variables.requestId ? { ...n, type: "friend_request_rejected" } : n)),
      );
    },
  });
};
