import { supabase } from "../api/supabase-client";
import type { WishlistItem } from "../types/wishlistItem";

type ServiceResult<T = null> = {
  error: string | null;
  result: T | null;
};

export const wishlistItemService = {
  async create(data: Omit<WishlistItem, "id">): Promise<ServiceResult<WishlistItem>> {
    try {
      const { data: inserted, error } = await supabase.from("wishlist_items").insert(data).select().single();
      if (error) {
        return { error: error.message, result: null };
      }
      return { error: null, result: inserted };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        result: null,
      };
    }
  },

  async delete(id: WishlistItem["id"]): Promise<ServiceResult> {
    try {
      const { data, error } = await supabase.from("wishlist_items").delete().eq("id", id).select().single();

      if (error) return { error: error.message, result: null };
      if (!data) return { error: "Элемент не найден", result: null };

      return { error: null, result: data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        result: null,
      };
    }
  },

  async update(editData: Partial<WishlistItem>): Promise<ServiceResult> {
    try {
      const { data: updated, error } = await supabase.from("wishlist_items").update(editData).eq("id", editData.id).select().single();

      if (error) return { error: error.message, result: null };

      return { error: null, result: updated };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        result: null,
      };
    }
  },
};
