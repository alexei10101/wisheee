import NotificationCard from "@/entities/notification/ui/notification-card";
import { friendsRequestService } from "@/entities/friend-request/friend-request.service";
import { useNotificationStore } from "@/entities/notification/model/notification.store";
import { ItemGroup } from "@/shared/ui/kit/item";
import { useCallback } from "react";
import { useAuth } from "@/entities/user/model/use-auth";

export function NotificationList() {
  const { user } = useAuth();
  const notifications = useNotificationStore().notifications;

  const handleAcceptingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!user?.id) return;
      const response = await friendsRequestService.acceptFriendRequest(user.id, receiverId, requestId);
      if (response.error) console.log(response.error);
    },
    [user?.id],
  );
  const handleRejectingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!user?.id) return;
      friendsRequestService.rejectFriendRequest(user.id, receiverId, requestId);
    },
    [user?.id],
  );

  if (!user?.id) return null;
  return (
    <ItemGroup>
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          userId={user.id}
          notification={n}
          onAccept={() => handleAcceptingRequest(n.sender_id, n.entity_id)}
          onReject={() => handleRejectingRequest(n.sender_id, n.entity_id)}
        />
      ))}
    </ItemGroup>
  );
}
