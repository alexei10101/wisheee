import { supabase } from "@/shared/api/supabase-client";
import type { WishlistItem } from "../model/wishlist-item";

export const wishlistItemRepository = {
  async create(data: Omit<WishlistItem, "id">) {
    return supabase.from("wishlist_items").insert(data).select().single();
  },
  async delete(id: string) {
    return supabase.from("wishlist_items").delete().eq("id", id).select().single();
  },
  async update(updatedData: Partial<WishlistItem>) {
    return supabase.from("wishlist_items").update(updatedData).eq("id", updatedData.id).select().single();
  },
};
