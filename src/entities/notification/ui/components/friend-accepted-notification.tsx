import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendAcceptedNotification({ notification, onOpen }: Omit<NotificationCardProps, "onAccept" | "onReject">) {
  const data = {
    username: notification.metadata?.receiver_username ?? notification.metadata?.sender_username ?? "",
    avatar: notification.metadata?.receiver_avatar ?? notification.metadata?.sender_avatar ?? "",
  };

  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      <ItemTitle className="inline-flex w-full flex-wrap items-center gap-1">
        <button className="leading-0" onClick={() => onOpen(notification.sender_id)}>
          <UserBadge user={{ username: data.username, avatar_url: data.avatar }} />
        </button>
        <span>теперь у вас в друзьях!</span>
      </ItemTitle>
    </>
  );
}
