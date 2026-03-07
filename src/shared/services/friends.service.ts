import { supabase } from "../api/supabase-client";
import type { Profile } from "../types/profile";

type ServiceResult<T = null> = {
  error: string | null;
  result: T | null;
};

export const friendsService = {
  async getFriendsInfo(friendIds: Profile["id"][]): Promise<ServiceResult<Profile[]>> {
    if (!friendIds.length) {
      return { error: null, result: [] };
    }

    try {
      const { data, error } = await supabase.from("profiles").select(`*`).in("id", friendIds);
      if (error) {
        return { error: error.message, result: null };
      }
      return { error: null, result: data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        result: null,
      };
    }
  },

  async searchUsers(query: string, id: Profile["id"]): Promise<ServiceResult<Profile[]>> {
    try {
      const { data, error } = await supabase.from("profiles").select("*").ilike("username", `%${query}%`).neq("id", id);
      if (error) {
        return { error: error.message, result: null };
      }
      return { error: null, result: data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        result: null,
      };
    }
  },

  // getFriendsInfo - по id друзей запрашиваем wishlists[], username и avatarLink каждого друга
};
