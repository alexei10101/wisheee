import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import type { WishlistItem } from "./wishlist-item";
import { wishlistItemRepository } from "../api/wishlist-item.repository";

export const wishlistItemService = {
  async create(data: Omit<WishlistItem, "id" | "image_url">): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.create(data));
  },
  async delete(wishlistItemId: string): Promise<ServiceResult> {
    return safeQuery(wishlistItemRepository.delete(wishlistItemId));
  },
  async update(updatedData: Partial<WishlistItem>): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.update(updatedData));
  },
  async uploadImage(userId: string, wishlistItemId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${wishlistItemId}/image.${fileExt}`;

    const { error: uploadError } = await safeQuery(wishlistItemRepository.uploadImage(file, filePath));
    if (uploadError) return { result: null, error: uploadError };

    const { data } = wishlistItemRepository.getPublicUrl(filePath);

    return {
      result: data,
      error: null,
    };
  },
};
