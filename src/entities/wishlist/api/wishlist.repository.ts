import { api } from "@/shared/api/api";
import type { CreateWishlistType, UpdateWishlistType } from "../model/wishlist.validation";
import type { Wishlist, WishlistWithItems } from "../model/wishlist";
import type { ApiResponse } from "@/shared/api/types";

export const wishlistRepository = {
  async getList(userId?: string): Promise<Wishlist[]> {
    const url = userId ? `/users/${userId}/wishlists` : "/wishlists";
    const { data } = await api.get<ApiResponse<Wishlist[]>>(url);
    return data.data;
  },

  async getById(wishlistId: string): Promise<WishlistWithItems | null> {
    const { data } = await api.get<ApiResponse<WishlistWithItems | null>>(`/wishlists/${wishlistId}`);
    return data.data;
  },

  async create(createData: CreateWishlistType): Promise<Wishlist> {
    const { data } = await api.post<ApiResponse<Wishlist>>("/wishlists", createData);
    return data.data;
  },

  async update(wishlistId: string, updateData: UpdateWishlistType): Promise<Wishlist | null> {
    const { data } = await api.patch<ApiResponse<Wishlist | null>>(`/wishlists/${wishlistId}`, updateData);
    return data.data;
  },

  async delete(wishlistId: string): Promise<string> {
    const { data } = await api.delete<ApiResponse<null>>(`/wishlists/${wishlistId}`);
    return data.message;
  },
};
