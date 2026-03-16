import type { FriendNotificationMetadata, FriendRequestStatus } from "@/entities/friend-request/friend-request";
import { supabase } from "@/shared/api/supabase-client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { AppNotification } from "../model/notification";

export const notificationRepository = {
  subscribe(
    userId: string,
    onInsert: (notification: AppNotification) => void,
    onUpdate: (notification: AppNotification) => void,
  ): RealtimeChannel {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => {
          onInsert(payload.new as AppNotification);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => {
          onUpdate(payload.new as AppNotification);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `sender_id=eq.${userId}`,
        },
        (payload) => {
          onUpdate(payload.new as AppNotification);
        },
      )
      .subscribe();

    return channel;
  },
  unsubscribe(channel: RealtimeChannel) {
    supabase.removeChannel(channel);
  },
  async createFriendNotification(
    senderId: string,
    receiverId: string,
    requestId: string,
    metadata: FriendNotificationMetadata,
    status?: FriendRequestStatus,
  ) {
    const type = status ? `friend_request_${status}` : "friend_request";

    const receiverMetadata = {
      request_sender_id: metadata?.request_sender_id,
      sender_username: status ? metadata.receiver_username : metadata.sender_username,
      sender_avatar: status ? metadata.receiver_avatar : metadata.sender_avatar,
    };

    const senderMetadata = {
      request_sender_id: metadata.request_sender_id,
      receiver_username: status ? metadata.sender_username : metadata.receiver_username,
      receiver_avatar: status ? metadata.sender_avatar : metadata.receiver_avatar,
    };

    return supabase.from("notifications").insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        type,
        entity_id: requestId,
        is_read: false,
        metadata: receiverMetadata,
      },
      {
        sender_id: receiverId,
        receiver_id: senderId,
        type,
        entity_id: requestId,
        is_read: true,
        metadata: senderMetadata,
      },
    ]);
  },
  async updateFriendNotification(status: Omit<FriendRequestStatus, "pending">, entityId: string) {
    return supabase
      .from("notifications")
      .update({ type: `friend_request_${status}` })
      .in("entity_id", [entityId]);
  },
  async markAllAsRead(userId: string) {
    return supabase.from("notifications").update({ is_read: true }).eq("receiver_id", userId).eq("is_read", false).select("*");
  },
  async fetchNotifications(userId: string) {
    return supabase.from("notifications").select("*").eq("receiver_id", userId).order("created_at", { ascending: false }).limit(30);
  },
};
