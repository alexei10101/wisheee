import { supabase } from "../api/supabase-client";
import { safeQuery, type ServiceResult } from "../api/safe-query";
import type { Notification } from "../types/notification";
import type { FriendRequest, FriendRequestStatus } from "../types/requests/friend";

export const notificationService = {
  async createFriendNotification(
    senderId: string,
    receiverId: string,
    requestId: string,
    status?: FriendRequestStatus,
  ): Promise<ServiceResult> {
    return safeQuery(
      supabase.from("notifications").insert({
        receiver_id: receiverId,
        sender_id: senderId,
        type: status ? `friend_request_${status}` : "friend_request",
        event_id: requestId,
        entity_id: requestId,
      }),
    );
  },
  async createFriendRequest(senderId: string, receiverId: string): Promise<ServiceResult<FriendRequest>> {
    return safeQuery(
      supabase
        .from("friend_requests")
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          status: "pending",
        })
        .select()
        .single(),
    );
  },
  async updateRequestStatus(
    requestId: FriendRequest["id"],
    status: Omit<FriendRequestStatus, "pending">,
  ): Promise<ServiceResult<FriendRequest | null>> {
    return safeQuery(
      supabase
        .from("friend_requests")
        .update({
          status,
        })
        .eq("id", requestId)
        .eq("status", "pending")
        .select("*")
        .maybeSingle(),
    );
  },
  async createFriendship(senderId: string, receiverId: string): Promise<ServiceResult> {
    return safeQuery(
      supabase.from("friends").insert([
        { user_id: senderId, friend_id: receiverId },
        { user_id: receiverId, friend_id: senderId },
      ]),
    );
  },
  async checkRequestExisting(senderId: string, receiverId: string): Promise<ServiceResult<{ id: string } | null>> {
    return safeQuery(
      supabase
        .from("friend_requests")
        .select("id")
        .eq("sender_id", senderId)
        .eq("receiver_id", receiverId)
        .eq("status", "pending")
        .maybeSingle(),
    );
  },

  async acceptFriendRequest(senderId: string, receiverId: string, requestId: FriendRequest["id"]) {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    const status: FriendRequestStatus = "accepted";

    const updating = await this.updateRequestStatus(requestId, status);
    if (updating.error) return { error: updating.error, result: null };
    if (!updating.result) return { error: "Ошибка обновления запроса", result: null };

    const friendship = await this.createFriendship(senderId, receiverId);
    if (friendship.error) return { error: friendship.error, result: null };

    const notification = await this.createFriendNotification(senderId, receiverId, updating.result.id, status);
    if (notification.error) return { error: notification.error, result: null };

    return { error: null, result: null };
  },
  async rejectFriendRequest(senderId: string, receiverId: string, requestId: FriendRequest["id"]) {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    const status: FriendRequestStatus = "rejected";

    const updating = await this.updateRequestStatus(requestId, status);
    if (updating.error) return { error: updating.error, result: null };
    if (!updating.result) return { error: "Ошибка обновления запроса", result: null };

    const notification = await this.createFriendNotification(senderId, receiverId, updating.result.id, status);
    if (notification.error) return { error: notification.error, result: null };

    return { error: null, result: null };
  },
  async sendFriendRequest(senderId: string, receiverId: string): Promise<ServiceResult> {
    if (!senderId || !receiverId) return { error: "Нет id", result: null };
    if (senderId === receiverId) return { error: "id одинаковы", result: null };

    const existing = await this.checkRequestExisting(senderId, receiverId);
    if (existing.error) return { error: existing.error, result: null };
    if (existing.result) return { error: "Запрос уже существует", result: null };

    const request = await this.createFriendRequest(senderId, receiverId);
    if (request.error) return { error: request.error, result: null };
    if (!request.result) return { error: "Ошибка создания запроса", result: null };

    const notification = await this.createFriendNotification(senderId, receiverId, request.result.id);
    if (notification.error) return { error: notification.error, result: null };

    return { error: null, result: null };
  },
  // TODO: add delete friend
  async fetchNotifications(userId: string): Promise<ServiceResult<Notification[]>> {
    return safeQuery(
      supabase.from("notifications").select("*").eq("receiver_id", userId).order("created_at", { ascending: false }).limit(30),
    );
  },
};
