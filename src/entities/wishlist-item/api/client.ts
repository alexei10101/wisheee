import { callEdge, EdgeOperation } from "@/shared/api/edge-client";
import type { ApiResponse } from "@/shared/api/edge-response.type";
import type { WishlistItem } from "../model/wishlist-item";

export const wishlistItemApi = {
  async reserveWishlistItem(userId: string, wishlistItemId: string, accessToken: string): Promise<ApiResponse<WishlistItem>> {
    const body = {
      userId,
      wishlistItemId,
    };

    return callEdge(EdgeOperation.reserveWishlistItem, accessToken, body);
  },
};
