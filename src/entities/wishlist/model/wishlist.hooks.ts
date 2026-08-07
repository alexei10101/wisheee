import { useQuery } from "@tanstack/react-query";
import { wishlistKeys } from "./wishlist.queries";
import { wishlistRepository } from "../api/wishlist.repository";

export const useMyWishlists = () => {
  return useQuery({
    queryKey: wishlistKeys.my,
    queryFn: () => wishlistRepository.getList(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserWishlists = (userId?: string) => {
  return useQuery({
    queryKey: wishlistKeys.user(userId!),
    queryFn: () => wishlistRepository.getList(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyWishlist = (wishlistId?: string) => {
  return useQuery({
    queryKey: wishlistKeys.my,
    queryFn: () => wishlistRepository.getList(),
    enabled: !!wishlistId,
    staleTime: 1000 * 60 * 5,
    select: (wishlists) => wishlists.find((wishlist) => wishlist.id === wishlistId),
  });
};
