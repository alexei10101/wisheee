import type { User } from "@/entities/user/model/user";

export type AppNotificationType =
  "FRIEND_REQUEST_CREATED" | "FRIEND_REQUEST_ACCEPTED" | "FRIEND_REQUEST_REJECTED";

export interface AppNotification {
  id: string;
  type: AppNotificationType;
  entityId: string;
  recipient: User;
  actor: User | null;
  counterparty: User | null;
  readAt: Date | null;
  createdAt: Date;
}

export interface AppNotificationResponse {
  items: AppNotification[];
  unreadCount: number;
}
