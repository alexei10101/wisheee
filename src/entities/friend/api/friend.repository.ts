import { supabase } from "@/shared/api/supabase-client";

export const friendRepository = {
  async getFriend(friendIds: string[]) {
    return supabase.from("profiles").select(`*`).in("id", friendIds);
  },
  // TODO: improve fetch, add RLC
  async getFriendsInfo(userId: string) {
    return supabase
      .from("friends")
      .select(`friend:profiles!friends_friend_id_fkey (*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },
  async createFriendship(senderId: string, receiverId: string) {
    return supabase.from("friends").insert([
      { user_id: senderId, friend_id: receiverId },
      { user_id: receiverId, friend_id: senderId },
    ]);
  },
  // TODO: improve fetch, add RLC
  async searchUsers(query: string, id: string) {
    return supabase.from("profiles").select("*").ilike("username", `%${query}%`).neq("id", id).limit(20);
  },
};
