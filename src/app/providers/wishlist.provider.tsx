import type { Wishlist, WishlistWithItems } from "@/entities/wishlist/model/wishlist";
import { useEffect, useState } from "react";
import { WishlistContext } from "../contexts/wishlist.context";
import { UserAuth } from "../contexts/auth.context";
import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = UserAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [activeWishlist, setActiveWishlist] = useState<WishlistWithItems | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setWishlists([]);
      setActiveWishlist(null);
      return;
    }

    setWishlists(user.wishlists ?? []);
    setActiveWishlist(null);
  }, [user?.id]);

  // Wishlist operations
  const createWishlist = (wishlist: Wishlist) => setWishlists((prev) => [wishlist, ...prev]);
  const deleteWishlist = (wishlistId: string) => setWishlists((prev) => prev.filter((pr) => pr.id !== wishlistId));
  const updateWishlist = (updatedFields: Partial<Wishlist>, wishlistId: string) =>
    setWishlists((prev) => prev.map((wishlist) => (wishlist.id === wishlistId ? { ...wishlist, ...updatedFields } : wishlist)));

  // Wishlist item operations
  const createWishlistItem = (wishlistItem: WishlistItem) => {
    setActiveWishlist((prev) => {
      if (!prev || !wishlistItem) return prev;
      return {
        ...prev,
        wishlist_items: [...(prev.wishlist_items ?? []), wishlistItem],
      };
    });
  };
  const deleteWishlistItem = (wishlistItemId: string) =>
    setActiveWishlist((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        wishlist_items: prev.wishlist_items.filter((item) => item.id !== wishlistItemId),
      };
    });
  const updateWishlistItem = (updatedWishlistItem: WishlistItem) => {
    if (activeWishlist?.id !== updatedWishlistItem.wishlist_id) return deleteWishlistItem(updatedWishlistItem.id);
    setActiveWishlist((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        wishlist_items: prev.wishlist_items.map((item) => (item.id === updatedWishlistItem.id ? updatedWishlistItem : item)),
      };
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        setWishlists,
        createWishlist,
        deleteWishlist,
        updateWishlist,

        activeWishlist,
        setActiveWishlist,
        createWishlistItem,
        deleteWishlistItem,
        updateWishlistItem,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}
