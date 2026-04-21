import { supabase } from "@/shared/api/supabase-client";
import type { Wishlist } from "../model/wishlist";

export const wishlistRepository = {
  async getAll(userId: String) {
    return supabase.from("wishlists").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  },
  async create(id: string, data: Omit<Wishlist, "user_id" | "id">) {
    return supabase
      .from("wishlists")
      .insert({
        user_id: id,
        ...data,
      })
      .select("*")
      .single();
  },
  async delete(userId: string, wishlistId: string) {
    return supabase.from("wishlists").delete().eq("id", wishlistId).eq("user_id", userId);
  },
  async update(userId: string, wishlistId: string, editData: Partial<Wishlist>) {
    return supabase.from("wishlists").update(editData).eq("id", wishlistId).eq("user_id", userId).select().single();
  },
};
