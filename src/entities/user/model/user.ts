import type { Wishlist } from "@/entities/wishlist/model/wishlist";

export type User = {
  id: string;
  username: string;
  avatar_url: string | null;
  friends: string[];
  wishlists: Wishlist[];
};
