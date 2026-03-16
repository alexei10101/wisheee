import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";

export type Wishlist = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_public: boolean;
};

export type WishlistWithItems = Wishlist & {
  wishlist_items: WishlistItem[];
};
