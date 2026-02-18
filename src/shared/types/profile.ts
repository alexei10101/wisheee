import type { Wishlist } from "./wishlist";

export type Profile = {
  id: string;
  username: string;
  avatarLink: string;
  friends: string[];
  wishlists: Wishlist[];
};
