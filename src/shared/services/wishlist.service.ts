import { supabase } from "../api/supabase-client";

export const wishlistService = {
  async getWishlistWithItems(wishlistId: string) {
    return supabase
      .from("wishlists")
      .select(
        `
        *,
        wishlist_items (
          *,
          reserved_gifts (*)
        )
      `,
      )
      .eq("id", wishlistId)
      .single();
  },
};
