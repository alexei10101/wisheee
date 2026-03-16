import type { JSX } from "react";
import type { NotificationCardProps } from "../ui/notification-card";
import { FriendAcceptedNotification } from "../ui/components/friend-accepted-notification";
import { FriendRejectedNotification } from "../ui/components/friend-rejected-notification";
import { FriendPendingNotification } from "../ui/components/friend-pending-notification";
import type { AppNotificationType } from "./notification";

type NotificationComponent = ({ notification, onAccept, onReject }: NotificationCardProps) => JSX.Element;

export const notificationComponents: Record<AppNotificationType, NotificationComponent> = {
  friend_request: FriendPendingNotification,
  friend_request_accepted: FriendAcceptedNotification,
  friend_request_rejected: FriendRejectedNotification,
};
