import type { FriendNotificationMetadata, FriendRequestStatus } from "@/entities/request/friend-request/model/friend-request";
import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { notificationRepository } from "../api/notification.repository";
import type { AppNotification } from "./notification";
import { updateFriendRequestStatus } from "../api/notification.client";
import type { Session } from "@supabase/supabase-js";

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
  async updateFriendNotification(session: Session, entityId: string, status: Omit<FriendRequestStatus, "pending">): Promise<ServiceResult> {
    return updateFriendRequestStatus(session, entityId, status);
  },
  async fetchNotifications(userId: string): Promise<ServiceResult<AppNotification[]>> {
    return safeQuery(notificationRepository.fetchNotifications(userId));
  },
  async markAllNotificationsAsRead(userId: string) {
    return safeQuery(notificationRepository.markAllAsRead(userId));
  },
  //   async markNotificationsAsRead(userId: string, ids: string[]) {
  //     return safeQuery(notificationRepository.markAsRead(userId, ids));
  //   },
};
