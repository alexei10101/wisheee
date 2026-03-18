import { useQuery } from "@tanstack/react-query";
import { wishlistService } from "./wishlist.service";
import { unwrap } from "@/shared/api/helper-unwrap";

export const wishlistKeys = {
  all: ["wishlists"] as const,
  list: (userId: string) => ["wishlists", userId] as const,
  detail: (wishlistId: string) => ["wishlists", "detail", wishlistId] as const,
};

export const useWishlists = (userId?: string) =>
  useQuery({
    queryKey: wishlistKeys.list(userId ?? ""),
    queryFn: async () => {
      const result = await wishlistService.getAll(userId!);
      return unwrap(result);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

export const useWishlist = (id?: string) =>
  useQuery({
    queryKey: wishlistKeys.detail(id!),
    queryFn: async () => {
      const result = await wishlistService.get(id!);
      return unwrap(result);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
