import type { NotificationType } from "@/shared/types/notification";
import FriendAcceptedNotification from "./components/friendAcceptedNotification";
import FriendPendingNotification from "./components/friendPendingNotification";
import FriendRejectedNotification from "./components/friendRejectedNotification";
import type { NotificationCardProps } from "./notification-card";
import type { JSX } from "react";

type NotificationComponent = ({ notification, onAccept, onReject }: NotificationCardProps) => JSX.Element;

export const notificationComponents: Record<NotificationType, NotificationComponent> = {
  friend_request: FriendPendingNotification,
  friend_request_accepted: FriendAcceptedNotification,
  friend_request_rejected: FriendRejectedNotification,
};
