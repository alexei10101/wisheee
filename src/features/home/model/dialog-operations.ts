import type { Profile } from "@/shared/types/profile";
import type { Wishlist } from "@/shared/types/wishlist";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/shared/api/supabase-client";

type DialogOperationResult = {
  error: string | null;
  result: Wishlist | null;
};

export async function createWishlist(userId: Profile["id"], data: Omit<Wishlist, "user_id" | "id">): Promise<DialogOperationResult> {
  const newWishlist = { id: uuidv4(), user_id: userId, ...data };

  try {
    const { error } = await supabase
      .from("wishlists")
      .upsert({
        ...newWishlist,
      })
      .single();
    if (error) {
      return { error: error.message, result: null };
    }
    return { error: null, result: newWishlist };
  } catch (error) {
    return { error: error as string, result: null };
  }
}

export async function deleteWishlist(userId: Profile["id"], id: Wishlist["id"], deleteItems: boolean): Promise<DialogOperationResult> {
  try {
    const { error } = await supabase.from("wishlists").delete().eq("id", id).eq("user_id", userId);

    if (error) {
      console.error("Ошибка удаления:", error.message);
      return { error: error.message, result: null };
    }

    if (deleteItems) {
      console.log("Удаляем также товары");
      // TODO: вызываем RPC
    }

    return { error: null, result: null };
  } catch (error) {
    return { error: error as string, result: null };
  }
}

export async function editWishlist(userId: Profile["id"], id: Wishlist["id"], editData: Partial<Wishlist>): Promise<DialogOperationResult> {
  try {
    const { error } = await supabase.from("wishlists").update(editData).eq("id", id).eq("user_id", userId);

    if (error) {
      console.error("Ошибка изменения:", error.message);
      return { error: error.message, result: null };
    }

    return { error: null, result: null };
  } catch (error) {
    return { error: error as string, result: null };
  }
}
