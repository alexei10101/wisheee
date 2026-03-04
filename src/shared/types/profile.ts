import type { Wishlist } from "./wishlist";

export type Profile = {
  id: string;
  username: string;
  avatarLink: string;
  friends: { friend_id: string }[];
  wishlists: Wishlist[];
};
