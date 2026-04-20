import { useQuery } from "@tanstack/react-query";
import { wishlistService } from "./wishlist.service";
import { unwrap } from "@/shared/api/helper-unwrap";
import type { Wishlist } from "./wishlist";

export const wishlistKeys = {
  all: ["wishlists"] as const,
  list: (userId: string) => ["wishlists", userId],
  detail: (wishlistId: string, opts?: { withResolver: boolean }) => ["wishlists", "detail", wishlistId, opts?.withResolver ?? false],
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

export const useWishlist = (id: string | undefined, isOwner: boolean) =>
  useQuery({
    queryKey: wishlistKeys.detail(id!, isOwner ? { withResolver: isOwner } : undefined),
    queryFn: async () => {
      const result = await wishlistService.get(id!, isOwner);
      return unwrap(result);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
