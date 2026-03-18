import type { Wishlist } from "@/entities/wishlist/model/wishlist";

export type User = {
  id: string;
  username: string;
  avatarLink: string;
  friends: string[];
  wishlists: Wishlist[];
};
