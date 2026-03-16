// items are strongly bounded with wishlist
// if you need private items you can create private wishlist

export type WishlistItem = {
  id: string;
  wishlist_id: string;
  title: string;
  description: string;
  link: string;
  price: number;
};
