import { useQuery } from "@tanstack/react-query";
import { wishlistService } from "./wishlist.service";
import { unwrap, unwrapApiResponse } from "@/shared/api/helper-unwrap";
import type { Wishlist } from "./wishlist";

export const wishlistKeys = {
  all: ["wishlists"] as const,
  list: (userId: string) => ["wishlists", userId],
  detail: (wishlistId: string) => ["wishlists", "detail", wishlistId],
} as const;

export const useWishlists = (userId?: string, wishlists?: Wishlist[]) =>
  useQuery({
    queryKey: wishlistKeys.list(userId!),
    queryFn: async () => {
      if (wishlists) return wishlists;
      const result = await wishlistService.getAll(userId!);
      return unwrap(result);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

export const useWishlist = (accessToken?: string, id?: string) =>
  useQuery({
    queryKey: wishlistKeys.detail(id!),
    queryFn: async () => {
      const result = await wishlistService.get(accessToken!, id!);
      return unwrapApiResponse(result);
    },
    enabled: !!id && !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
