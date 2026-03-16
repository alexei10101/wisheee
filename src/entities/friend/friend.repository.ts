import { supabase } from "@/shared/api/supabase-client";

export const friendRepository = {
  async getFriend(friendIds: string[]) {
    return supabase.from("profiles").select(`*`).in("id", friendIds);
  },
  async getFriendsInfo(friendIds: string[]) {
    return supabase.from("profiles").select(`*`).in("id", friendIds);
  },
  async createFriendship(senderId: string, receiverId: string) {
    return supabase.from("friends").insert([
      { user_id: senderId, friend_id: receiverId },
      { user_id: receiverId, friend_id: senderId },
    ]);
  },
  async searchUsers(query: string, id: string) {
    return supabase.from("profiles").select("*").ilike("username", `%${query}%`).neq("id", id);
  },
};
