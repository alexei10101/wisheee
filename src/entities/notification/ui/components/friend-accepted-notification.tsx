import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendAcceptedNotification({ notification }: Omit<NotificationCardProps, "onAccept" | "onReject">) {
  const data = {
    username: notification.metadata?.receiver_username ?? notification.metadata?.sender_username,
    avatar: notification.metadata?.receiver_avatar ?? notification.metadata?.sender_avatar,
  };

  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      <ItemTitle>
        <UserBadge user={{ username: data.username ?? "", avatar_url: data.avatar ?? "" }} />
        <span>теперь у вас в друзьях!</span>
      </ItemTitle>
    </>
  );
}
