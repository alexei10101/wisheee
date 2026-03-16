import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import type { WishlistItem } from "./wishlist-item";
import { wishlistItemRepository } from "../api/wishlist-item.repository";

export const wishlistItemService = {
  async create(data: Omit<WishlistItem, "id">): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.create(data));
  },
  async delete(wishlistItemId: string): Promise<ServiceResult> {
    return safeQuery(wishlistItemRepository.delete(wishlistItemId));
  },
  async update(updatedData: Partial<WishlistItem>): Promise<ServiceResult<WishlistItem>> {
    return safeQuery(wishlistItemRepository.update(updatedData));
  },
};
