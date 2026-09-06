import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { UserBadge } from "@/entities/user/ui/user.badge";

export function FriendAcceptedNotification({
  notification,
  onOpen,
}: Pick<NotificationCardProps, "notification" | "onOpen">) {
  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      {notification.counterparty && (
        <ItemTitle className="inline-flex w-full flex-wrap items-center gap-1">
          <button
            className="leading-0"
            onClick={() =>
              notification.counterparty?.id ? onOpen(notification.counterparty.id) : null
            }
          >
            <UserBadge
              user={{
                username: notification.counterparty.username,
                avatar: notification.counterparty.avatar,
              }}
            />
          </button>
          <span>теперь у вас в друзьях!</span>
        </ItemTitle>
      )}
    </>
  );
}
