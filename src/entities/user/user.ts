import type { Wishlist } from "../wishlist/model/wishlist";

export type User = {
  id: string;
  username: string;
  avatarLink: string;
  friends: string[];
  wishlists: Wishlist[];
};
