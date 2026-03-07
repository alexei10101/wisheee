import { ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import type { NotificationCardProps } from "../notification-card";

const FriendRejectedNotification = ({ notification }: Omit<NotificationCardProps, "onAccept" | "onReject">) => {
  return (
    <>
      <ItemDescription>Отклоненная заявка в друзья</ItemDescription>
      <ItemTitle>Вы отклонили заявку в друзья от {notification.metadata?.sender_username}.</ItemTitle>
    </>
  );
};

export default FriendRejectedNotification;
