import type { Wishlist, WishlistWithItems } from "@/entities/wishlist/model/wishlist";
import { createContext, useContext } from "react";

type WishlistContextType = {
  wishlists: Wishlist[];
  setWishlists: React.Dispatch<React.SetStateAction<Wishlist[]>>;
  createWishlist: Function;
  deleteWishlist: Function;
  updateWishlist: Function;

  activeWishlist: WishlistWithItems | null;
  setActiveWishlist: React.Dispatch<React.SetStateAction<WishlistWithItems | null>>;
  createWishlistItem: Function;
  deleteWishlistItem: Function;
  updateWishlistItem: Function;
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlists: [],
  setWishlists: () => {},
  createWishlist: () => {},
  deleteWishlist: () => {},
  updateWishlist: () => {},

  activeWishlist: null,
  setActiveWishlist: () => {},
  createWishlistItem: () => {},
  deleteWishlistItem: () => {},
  updateWishlistItem: () => {},
});

export const UserWishlists = () => {
  return useContext(WishlistContext);
};
