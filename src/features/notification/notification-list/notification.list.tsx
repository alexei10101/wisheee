import type { AppNotification } from "@/entities/notification/model/notification";
import { NotificationCard } from "@/entities/notification/ui/notification-card";
import {
  useAcceptFriendRequest,
  useRejectFriendRequest,
} from "@/entities/request/friend-request/model/friend-request.mutations";
import { buildRoutes } from "@/shared/routes";
import { List } from "@/shared/ui/list";
import { useNavigate } from "react-router";

type NotificationListProps = {
  userId: string | undefined;
  notifications: AppNotification[];
};

export function NotificationList({ notifications }: NotificationListProps) {
  const navigate = useNavigate();
  const onOpen = (userId: string) => {
    userId && navigate(buildRoutes.userWishlists(userId));
  };

  const acceptFriendRequest = useAcceptFriendRequest();
  const rejectFriendRequest = useRejectFriendRequest();

  const handleAcceptingRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest.mutateAsync(requestId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejectingRequest = async (requestId: string) => {
    try {
      await rejectFriendRequest.mutateAsync(requestId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List
      items={notifications ?? []}
      getKey={(n) => n.id}
      renderItem={(notification) => (
        <NotificationCard
          key={notification.id}
          userId={notification.recipient.id}
          notification={notification}
          onAccept={() => handleAcceptingRequest(notification.entityId)}
          onReject={() => handleRejectingRequest(notification.entityId)}
          onDelete={async () => {}}
          onOpen={onOpen}
        />
      )}
    ></List>
  );
}
