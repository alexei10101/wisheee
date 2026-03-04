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

  // на первых порах friends page - показываем все profiles - дальше организуем поиск друга
  // реализуем добавление друзей
  // addFriend - добавляем id в profile.friends
  // разбираться с запросами потом (чтобы друг подтвердил дружбу)
  // getFriendsInfo - по id друзей запрашиваем wishlists[], username и avatarLink каждого друга

  // async read(wishlistId: string): Promise<ServiceResult<WishlistWithItems>> {
  //   try {
  //     const { data, error } = await supabase
  //       .from("wishlists")
  //       .select(`*, wishlist_items (*)`)
  //       .eq("id", wishlistId)
  //       .order("created_at", { foreignTable: "wishlist_items", ascending: true })
  //       .single();
  //     if (error) {
  //       return { error: error.message, result: null };
  //     }
  //     return { error: null, result: data };
  //   } catch (error) {
  //     return {
  //       error: error instanceof Error ? error.message : "Неизвестная ошибка",
  //       result: null,
  //     };
  //   }
  // },
  // async add(userId: Profile["id"], addId: Profile["id"]): Promise<ServiceResult<Profile>> {
  // try {
  // const { data, error } = await supabase.from("profiles").select().single();
  // const { data: inserted, error } = await supabase
  //   .from("wishlists")
  //   .insert({
  //     user_id: userId,
  //     ...data,
  //   })
  //   .select()
  //   .single();
  // if (error) {
  //   return { error: error.message, result: null };
  // }
  //     return { error: null, result: inserted };
  //   } catch (error) {
  //     return {
  //       error: error instanceof Error ? error.message : "Неизвестная ошибка",
  //       result: null,
  //     };
  //   }
  // },
  // async delete(userId: Profile["id"], id: Wishlist["id"], deleteItems: boolean): Promise<ServiceResult> {
  //   try {
  //     const { error } = await supabase.from("wishlists").delete().eq("id", id).eq("user_id", userId);
  //     if (error) {
  //       return { error: error.message, result: null };
  //     }
  //     if (deleteItems) {
  //       console.log("Удаляем также товары");
  //       // TODO: вызываем RPC
  //     }
  //     return { error: null, result: null };
  //   } catch (error) {
  //     return {
  //       error: error instanceof Error ? error.message : "Неизвестная ошибка",
  //       result: null,
  //     };
  //   }
  // },
  // async update(userId: Profile["id"], id: Wishlist["id"], editData: Partial<Wishlist>): Promise<ServiceResult> {
  //   try {
  //     const { data: updated, error } = await supabase
  //       .from("wishlists")
  //       .update(editData)
  //       .eq("id", id)
  //       .eq("user_id", userId)
  //       .select()
  //       .single();
  //     if (error) {
  //       return { error: error.message, result: null };
  //     }
  //     return { error: null, result: updated };
  //   } catch (error) {
  //     return {
  //       error: error instanceof Error ? error.message : "Неизвестная ошибка",
  //       result: null,
  //     };
  //   }
  // },
};
