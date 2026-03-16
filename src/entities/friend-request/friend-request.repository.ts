import { supabase } from "@/shared/api/supabase-client";
import type { FriendRequestMetadata, FriendRequestStatus } from "./friend-request";

export const friendRequestRepository = {
  async createRequest(senderId: string, receiverId: string, metadata: FriendRequestMetadata) {
    return supabase
      .from("friend_requests")
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        status: "pending",
        sender_username: metadata.sender_username,
        sender_avatar: metadata.sender_avatar,
        receiver_username: metadata.receiver_username,
        receiver_avatar: metadata.receiver_avatar,
      })
      .select()
      .single();
  },
  async updateRequestStatus(requestId: string, status: Omit<FriendRequestStatus, "pending">) {
    return supabase
      .from("friend_requests")
      .update({
        status,
      })
      .eq("id", requestId)
      .eq("status", "pending")
      .select("*")
      .maybeSingle();
  },
  async checkRequestExisting(senderId: string, receiverId: string) {
    return supabase
      .from("friend_requests")
      .select("id")
      .eq("sender_id", senderId)
      .eq("receiver_id", receiverId)
      .eq("status", "pending")
      .maybeSingle();
  },
};
