import type { JSX } from "react";
import type { NotificationCardProps } from "../ui/notification-card";
import { FriendAcceptedNotification } from "../ui/components/friend-accepted-notification";
import { FriendRejectedNotification } from "../ui/components/friend-rejected-notification";
import { FriendCreatedNotification } from "../ui/components/friend-created-notification";
import type { AppNotificationType } from "./notification";

type NotificationComponent = ({
  notification,
  onAccept,
  onReject,
  onDelete,
}: NotificationCardProps) => JSX.Element;

export const notificationComponents: Record<AppNotificationType, NotificationComponent> = {
  FRIEND_REQUEST_CREATED: FriendCreatedNotification,
  FRIEND_REQUEST_ACCEPTED: FriendAcceptedNotification,
  FRIEND_REQUEST_REJECTED: FriendRejectedNotification,
};
