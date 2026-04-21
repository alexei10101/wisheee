import { callEdge, EdgeOperation } from "@/shared/api/edge-client";
import type { ApiResponse } from "@/shared/api/edge-response.type";
import type { WishlistWithItems } from "../model/wishlist";

export const wishlistApi = {
  async getWishlistWithItems(access_token: string, wishlistId: string): Promise<ApiResponse<WishlistWithItems>> {
    const body = {
      wishlistId,
    };

    return callEdge<WishlistWithItems>(EdgeOperation.getWishlist, access_token, body);
  },
};
