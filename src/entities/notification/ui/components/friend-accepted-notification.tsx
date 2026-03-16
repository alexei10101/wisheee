import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";

export function FriendAcceptedNotification({ notification }: Omit<NotificationCardProps, "onAccept" | "onReject">) {
  const senderUsername = notification.metadata?.sender_username;
  const receiverUsername = notification.metadata?.receiver_username;

  return (
    <>
      <ItemDescription>Новый друг</ItemDescription>
      <ItemTitle>{senderUsername ? senderUsername : receiverUsername} теперь у вас в друзьях!</ItemTitle>
    </>
  );
}
