import type { Wishlist } from "@/entities/wishlist/model/wishlist";

export type User = {
  id: string;
  username: string;
  avatar: string | null;
  friends: string[];
  wishlists: Wishlist[];
};

export type UserUpdateDto = Pick<User, "username" | "avatar">;
