import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";

const FriendAcceptedNotification = ({ notification }: Omit<NotificationCardProps, "onAccept" | "onReject">) => {
  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      <ItemTitle>{notification.metadata?.sender_username} теперь у вас в друзьях!</ItemTitle>
    </>
  );
};

export default FriendAcceptedNotification;
