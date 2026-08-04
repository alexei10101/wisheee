import { useQuery } from "@tanstack/react-query";
import { wishlistKeys } from "./wishlist.queries";
import { wishlistRepository } from "../api/wishlist.repository";

export const useWishlists = () => {
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
