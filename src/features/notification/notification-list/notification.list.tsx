import NotificationCard from "@/entities/notification/ui/notification-card";
import { ItemGroup } from "@/shared/ui/kit/item";
import { useCallback } from "react";
import { useAcceptFriendRequest, useRejectFriendRequest } from "@/entities/request/friend-request/model/friend-request.mutations";
import type { AppNotification } from "@/entities/notification/model/notification";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";

type NotificationListProps = {
  userId: string | undefined;
  notifications: AppNotification[];
};

export function NotificationList({ userId, notifications }: NotificationListProps) {
  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));

  const acceptFriendRequest = useAcceptFriendRequest();
  const rejectFriendRequest = useRejectFriendRequest();

  const handleAcceptingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!userId) return;
      try {
        await acceptFriendRequest.mutateAsync({ senderId: userId, receiverId, requestId });
      } catch (error) {
        console.log(error);
      }
    },
    [userId, acceptFriendRequest],
  );
  const handleRejectingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!userId) return;
      try {
        await rejectFriendRequest.mutateAsync({ senderId: userId, receiverId, requestId });
      } catch (error) {
        console.log(error);
      }
    },
    [userId, rejectFriendRequest],
  );

  if (!userId) return null;
  return (
    <ItemGroup className="gap-2 sm:gap-4">
      {notifications?.map((n) => (
        <NotificationCard
          key={n.id}
          userId={userId}
          notification={n}
          onAccept={() => handleAcceptingRequest(n.sender_id, n.entity_id)}
          onReject={() => handleRejectingRequest(n.sender_id, n.entity_id)}
          onOpen={onOpen}
        />
      ))}
    </ItemGroup>
  );
}
