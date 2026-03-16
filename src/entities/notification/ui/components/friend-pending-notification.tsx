import { ItemActions, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { Button } from "@/shared/ui/kit/button";

export function FriendPendingNotification({ userId, notification, onAccept, onReject }: NotificationCardProps) {
  const isRequestInitiator = notification.metadata?.request_sender_id === userId;

  const senderUsername = notification.metadata?.sender_username;
  const receiverUsername = notification.metadata?.receiver_username;

  return (
    <>
      <ItemDescription>{isRequestInitiator ? "Заявка в друзья" : "Новая заявка в друзья"}</ItemDescription>

      <ItemTitle>
        {isRequestInitiator ? (
          <>
            Вы отправили заявку в друзья пользователю <span className="font-bold">{receiverUsername}</span>
          </>
        ) : (
          <>
            <span className="font-bold">{senderUsername}</span> отправил вам заявку в друзья!
          </>
        )}
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
