import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendRejectedNotification({
  notification,
  onOpen,
}: Pick<NotificationCardProps, "notification" | "onOpen">) {
  const isActionOwner = notification.actor?.id === notification.recipient.id;

  const userBadge = notification.counterparty && (
    <div
      className="cursor-pointer"
      onClick={() => (notification.counterparty?.id ? onOpen(notification.counterparty.id) : null)}
    >
      <UserBadge
        user={{
          username: notification.counterparty.username,
          avatar: notification.counterparty.avatar,
        }}
      />
    </div>
  );
  const message = isActionOwner ? (
    <>
      Вы отклонили заявку в друзья от <button className="leading-0">{userBadge}</button>
    </>
  ) : (
    <>
      Пользователь <button className="leading-0">{userBadge}</button> отклонил заявку в друзья
    </>
  );

  return (
    <>
      <ItemDescription>Отклоненная заявка в друзья</ItemDescription>
      <ItemTitle className="inline-flex w-full flex-wrap gap-1">{message}</ItemTitle>
    </>
  );
}
