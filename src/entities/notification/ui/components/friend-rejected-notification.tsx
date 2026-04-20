import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendRejectedNotification({ userId, notification, onOpen }: Omit<NotificationCardProps, "onAccept" | "onReject">) {
  const isRequestInitiator = notification.metadata?.request_sender_id === userId;
  const data = {
    username: isRequestInitiator ? notification.metadata?.receiver_username : notification.metadata?.sender_username,
    avatar: isRequestInitiator ? notification.metadata?.receiver_avatar : notification.metadata?.sender_avatar,
  };
  const userBadge = (
    <div className="cursor-pointer" onClick={() => onOpen(notification.receiver_id)}>
      <UserBadge
        user={{
          username: data.username ?? "",
          avatar_url: data.avatar ?? "",
        }}
      />
    </div>
  );

  return (
    <>
      <ItemDescription>Отклоненная заявка в друзья</ItemDescription>
      <ItemTitle className="inline-flex w-full flex-wrap gap-1">
        {isRequestInitiator ? (
          <>
            Пользователь <button className="leading-0">{userBadge}</button> отклонил заявку в друзья
          </>
        ) : (
          <>
            Вы отклонили заявку в друзья от <button className="leading-0">{userBadge}</button>
          </>
        )}
      </ItemTitle>
    </>
  );
}
