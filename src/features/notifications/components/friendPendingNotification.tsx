import { ItemActions, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";
import { Button } from "@/shared/ui/kit/button";

const FriendPendingNotification = ({ notification, onAccept, onReject }: NotificationCardProps) => {
  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      <ItemTitle>{notification.metadata?.sender_username} теперь у вас в друзьях!</ItemTitle>

      <ItemActions>
        <Button size="sm" variant="outline" onClick={onReject}>
          Отклонить
        </Button>

        <Button size="sm" variant="outline" onClick={onAccept}>
          Принять
        </Button>
      </ItemActions>
    </>
  );
};

export default FriendPendingNotification;
