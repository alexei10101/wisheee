import { wishlistRepository } from "../api/wishlist.repository";
import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import type { Wishlist, WishlistWithItems } from "./wishlist";
import { wishlistApi } from "../api/client";
import type { ApiResponse } from "@/shared/api/edge-response.type";

export const wishlistService = {
  async getAll(userId: string): Promise<ServiceResult<Wishlist[]>> {
    return safeQuery(wishlistRepository.getAll(userId));
  },
  async get(accessToken: string, id: string): Promise<ApiResponse<WishlistWithItems>> {
    return wishlistApi.getWishlistWithItems(accessToken, id);
  },
  async create(userId: string, data: Omit<Wishlist, "user_id" | "id">): Promise<ServiceResult<Wishlist>> {
    return safeQuery(wishlistRepository.create(userId, data));
  },
  async delete(userId: string, wishlistId: string): Promise<ServiceResult> {
    return safeQuery(wishlistRepository.delete(userId, wishlistId));
  },
  async update(userId: string, wishlistId: string, editData: Partial<Wishlist>): Promise<ServiceResult<Wishlist>> {
    return safeQuery(wishlistRepository.update(userId, wishlistId, editData));
  },
};
