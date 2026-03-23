import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendRejectedNotification({ userId, notification }: Omit<NotificationCardProps, "onAccept" | "onReject">) {
  const isRequestInitiator = notification.metadata?.request_sender_id === userId;
  const data = {
    username: isRequestInitiator ? notification.metadata?.receiver_username : notification.metadata?.sender_username,
    avatar: isRequestInitiator ? notification.metadata?.receiver_avatar : notification.metadata?.sender_avatar,
  };
  const userBadge = (
    <UserBadge
      user={{
        username: data.username ?? "",
        avatar_url: data.avatar ?? "",
      }}
    />
  );

  return (
    <>
      <ItemDescription>Отклоненная заявка в друзья</ItemDescription>
      <ItemTitle>
        {isRequestInitiator ? <>Пользователь {userBadge} отклонил заявку в друзья</> : <>Вы отклонили заявку в друзья от {userBadge}</>}
      </ItemTitle>
    </>
  );
}
