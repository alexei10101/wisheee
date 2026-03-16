import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { friendRequestRepository } from "./friend-request.repository";
import type { FriendNotificationMetadata, FriendRequest, FriendRequestMetadata, FriendRequestStatus } from "./friend-request";
import { friendService } from "../friend/friend.service";
import { notificationService } from "../notification/model/notification-service";

export const friendsRequestService = {
  async createFriendRequest(senderId: string, receiverId: string, metadata: FriendRequestMetadata): Promise<ServiceResult<FriendRequest>> {
    return safeQuery(friendRequestRepository.createRequest(senderId, receiverId, metadata));
  },
  async updateFriendRequestStatus(requestId: string, status: Omit<FriendRequestStatus, "pending">): Promise<ServiceResult<FriendRequest>> {
    return safeQuery(friendRequestRepository.updateRequestStatus(requestId, status));
  },
  async checkRequestExisting(senderId: string, receiverId: string): Promise<ServiceResult<{ id: string } | null>> {
    return safeQuery(friendRequestRepository.checkRequestExisting(senderId, receiverId));
  },

  async acceptFriendRequest(senderId: string, receiverId: string, requestId: string): Promise<ServiceResult> {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    const status: FriendRequestStatus = "accepted";

    const updating = await friendsRequestService.updateFriendRequestStatus(requestId, status);
    if (updating.error) return { error: updating.error, result: null };
    if (!updating.result) return { error: "Ошибка обновления запроса", result: null };
    // const updatingMetadata: FriendNotificationMetadata = {
    //   request_sender_id: updating.result.sender_id,
    //   sender_username: updating.result.sender_username,
    //   sender_avatar: updating.result.sender_avatar,
    //   receiver_username: updating.result.receiver_username,
    //   receiver_avatar: updating.result.receiver_avatar,
    // };

    const notification = await notificationService.updateFriendNotification(status, requestId);
    if (notification.error) return { error: notification.error, result: null };

    // const notification = await notificationService.createFriendNotification(
    //   updating.result.receiver_id,
    //   updating.result.sender_id,
    //   updating.result.id,
    //   updatingMetadata,
    //   status,
    // );
    // if (notification.error) return { error: notification.error, result: null };

    const friendship = await friendService.createFriendship(senderId, receiverId);
    if (friendship.error) return { error: friendship.error, result: null };

    return { error: null, result: null };
  },
  async rejectFriendRequest(senderId: string, receiverId: string, requestId: string): Promise<ServiceResult> {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    const status: FriendRequestStatus = "rejected";

    const updating = await friendsRequestService.updateFriendRequestStatus(requestId, status);
    if (updating.error) return { error: updating.error, result: null };
    if (!updating.result) return { error: "Ошибка обновления запроса", result: null };
    // const updatingMetadata: FriendNotificationMetadata = {
    //   request_sender_id: updating.result.sender_id,
    //   sender_username: updating.result.sender_username,
    //   sender_avatar: updating.result.sender_avatar,
    //   receiver_username: updating.result.receiver_username,
    //   receiver_avatar: updating.result.receiver_avatar,
    // };

    const notification = await notificationService.updateFriendNotification(status, requestId);
    if (notification.error) return { error: notification.error, result: null };

    // const notification = await notificationService.createFriendNotification(
    //   senderId,
    //   receiverId,
    //   updating.result.id,
    //   updatingMetadata,
    //   status,
    // );
    // if (notification.error) return { error: notification.error, result: null };

    return { error: null, result: null };
  },
  async sendFriendRequest(senderId: string, receiverId: string, metadata: FriendRequestMetadata): Promise<ServiceResult> {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    if (senderId === receiverId) return { error: "id одинаковы", result: null };

    const existing = await friendsRequestService.checkRequestExisting(senderId, receiverId);
    if (existing.error) return { error: existing.error, result: null };
    if (existing.result) return { error: "Запрос уже существует", result: null };

    const request = await friendsRequestService.createFriendRequest(senderId, receiverId, metadata);
    if (request.error) return { error: request.error, result: null };
    if (!request.result) return { error: "Ошибка создания запроса", result: null };

    const notification = await notificationService.createFriendNotification(senderId, receiverId, request.result.id, {
      ...metadata,
      request_sender_id: senderId,
    });
    if (notification.error) return { error: notification.error, result: null };

    return { error: null, result: null };
  },
};
