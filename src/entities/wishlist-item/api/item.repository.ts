import type { WishlistItem } from "../model/item";
import type { CreateWishlistItemType, UpdateWishlistItemType } from "../model/item.validation";
import { api } from "@/shared/api/api";

export const wishlistItemRepository = {
  async getList(wishlistId: string): Promise<WishlistItem[]> {
    const { data } = await api.get(`/wishlist-items/${wishlistId}`);
    return data.data;
  },
  async create(createData: CreateWishlistItemType): Promise<WishlistItem> {
    const { data } = await api.post("/wishlist-items", createData);
    return data.data;
  },
  async update(itemId: string, updateData: UpdateWishlistItemType): Promise<WishlistItem | null> {
    const { data } = await api.patch(`/wishlist-items/${itemId}`, updateData);
    return data.data;
  },
  async delete(itemId: string): Promise<{ wishlistId: string }> {
    const { data } = await api.delete(`/wishlist-items/${itemId}`);
    return data.data;
  },

  // async uploadImage(file: File, filePath: string) {
  //   return supabase.storage.from("wishlist-images").upload(filePath, file, { upsert: true });
  // },
  // getPublicUrl(filePath: string) {
  //   return supabase.storage.from("wishlist-images").getPublicUrl(filePath);
  // },
  // async removeImage(path: string) {
  //   return supabase.storage.from("wishlist-images").remove([path]);
  // },
};
