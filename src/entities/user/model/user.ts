import type { Wishlist } from "@/entities/wishlist/model/wishlist";

export type User = {
  id: string;
  username: string;
  avatar: string | null;
};

export type UserDetails = User & {
  wishlists: Wishlist[];
  friends: User[];
};

export type UserUpdateDto = Omit<User, "id">;
