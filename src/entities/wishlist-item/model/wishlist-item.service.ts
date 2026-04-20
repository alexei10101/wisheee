import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import type { WishlistItem } from "./wishlist-item";
import { wishlistItemRepository } from "../api/wishlist-item.repository";
import { convertToWebp } from "@/shared/utils/convert-image";

export const wishlistItemService = {
  async create(data: Omit<WishlistItem, "id" | "image_url">): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.create(data));
  },
  async delete(userId: string, wishlistItemId: string): Promise<ServiceResult> {
    wishlistItemService.removeImage(userId, wishlistItemId);
    return safeQuery(wishlistItemRepository.delete(wishlistItemId));
  },
  async update(updatedData: Partial<WishlistItem>): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.update(updatedData));
  },
  async reserve(userId: string, wishlistItemId: string): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.reserve(userId, wishlistItemId));
  },
  async uploadImage(userId: string, wishlistItemId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
    const webpFile = await convertToWebp(file);
    const filePath = `${userId}/${wishlistItemId}/image.webp`;

    const { error: uploadError } = await safeQuery(wishlistItemRepository.uploadImage(webpFile, filePath));
    if (uploadError) return { result: null, error: uploadError };

    const { data } = wishlistItemRepository.getPublicUrl(filePath);

    return {
      result: data,
      error: null,
    };
  },
  async removeImage(userId: string, wishlistItemId: string) {
    const path = `${userId}/${wishlistItemId}/image.webp`;
    const { error } = await wishlistItemRepository.removeImage(path);

    return { result: null, error };
  },
};
