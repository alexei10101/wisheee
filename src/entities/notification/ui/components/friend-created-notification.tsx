import { ItemActions, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { Button } from "@/shared/ui/kit/button";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendCreatedNotification({
  notification,
  onAccept,
  onReject,
  onDelete,
  onOpen,
}: NotificationCardProps) {
  const isActionOwner = notification.actor?.id === notification.recipient.id;
  const title = isActionOwner
    ? "Вы отправили заявку в друзья пользователю "
    : "Новая заявка в друзья от ";

  return (
    <>
      <ItemDescription>Заявка в друзья</ItemDescription>

      <ItemTitle className="inline-flex w-full flex-wrap items-center gap-1">
        <span>{title}</span>
        <button
          className="leading-0"
          onClick={() =>
            notification.counterparty?.id ? onOpen(notification.counterparty.id) : null
          }
        >
          {notification.counterparty && (
            <UserBadge
              user={{
                username: notification.counterparty.username,
                avatar: notification.counterparty.avatar,
              }}
            />
          )}
        </button>
      </ItemTitle>

      {!isActionOwner && (
        <ItemActions>
          <Button size="sm" variant="outline" onClick={onReject}>
            Отклонить
          </Button>

          <Button size="sm" variant="outline" onClick={onAccept}>
            Принять
          </Button>
        </ItemActions>
      )}
      {isActionOwner && (
        <ItemActions>
          <Button size="sm" variant="outline" onClick={onDelete}>
            Отменить заявку
          </Button>
        </ItemActions>
      )}
    </>
  );
}
