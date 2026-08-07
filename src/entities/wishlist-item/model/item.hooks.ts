import { useQuery } from "@tanstack/react-query";
import { wishlistItemsKeys } from "./item.queries";
import { wishlistItemRepository } from "../api/item.repository";

export const useWishlistItems = (wishlistId?: string) => {
  return useQuery({
    queryKey: wishlistItemsKeys.list(wishlistId!),
    queryFn: () => wishlistItemRepository.getList(wishlistId!),
    enabled: !!wishlistId,
    staleTime: 1000 * 60 * 5,
  });
};
