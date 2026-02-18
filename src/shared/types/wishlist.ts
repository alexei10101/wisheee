import type { WishlistItem } from "./wishlistItem";

export type Wishlist = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_public: boolean;
};
