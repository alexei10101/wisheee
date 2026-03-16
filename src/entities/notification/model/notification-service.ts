import type { FriendNotificationMetadata, FriendRequestStatus } from "@/entities/friend-request/friend-request";
import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { notificationRepository } from "../api/notification.repository";
import type { AppNotification } from "./notification";

export const notificationService = {
  async createFriendNotification(
    senderId: string,
    receiverId: string,
    requestId: string,
    metadata: FriendNotificationMetadata,
    status?: FriendRequestStatus,
  ): Promise<ServiceResult> {
    return safeQuery(notificationRepository.createFriendNotification(senderId, receiverId, requestId, metadata, status));
  },
  async updateFriendNotification(status: FriendRequestStatus, entityId: string): Promise<ServiceResult> {
    return safeQuery(notificationRepository.updateFriendNotification(status, entityId));
  },
  async fetchNotifications(userId: string): Promise<ServiceResult<AppNotification[]>> {
    return safeQuery(notificationRepository.fetchNotifications(userId));
  },
  async markAllNotificationsAsRead(userId: string) {
    return safeQuery(notificationRepository.markAllAsRead(userId));
  },
};
