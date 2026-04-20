import { ItemActions, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { Button } from "@/shared/ui/kit/button";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendPendingNotification({ userId, notification, onAccept, onReject, onOpen }: NotificationCardProps) {
  const isRequestInitiator = notification.metadata?.request_sender_id === userId;
  const data = {
    username: isRequestInitiator ? notification.metadata?.receiver_username : notification.metadata?.sender_username,
    avatar: isRequestInitiator ? notification.metadata?.receiver_avatar : notification.metadata?.sender_avatar,
  };
  const title = isRequestInitiator ? "Вы отправили заявку в друзья пользователю " : "Новая заявка в друзья от ";

  return (
    <>
      <ItemDescription>Заявка в друзья</ItemDescription>

      <ItemTitle>
        <span>{title}</span>
        <div className="cursor-pointer" onClick={() => onOpen(notification.sender_id)}>
          <UserBadge user={{ username: data.username ?? "", avatar_url: data.avatar ?? "" }} />
        </div>
      </ItemTitle>

      {!isRequestInitiator && (
        <ItemActions>
          <Button size="sm" variant="outline" onClick={onReject}>
            Отклонить
          </Button>

          <Button size="sm" variant="outline" onClick={onAccept}>
            Принять
          </Button>
        </ItemActions>
      )}
    </>
  );
}
