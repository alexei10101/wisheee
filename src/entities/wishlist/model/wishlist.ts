import type { WishlistItem } from "@/entities/wishlist-item/model/item";

export type Wishlist = {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  createdAt: Date;
};

export type WishlistWithItems = Wishlist & {
  items: WishlistItem[];
};
