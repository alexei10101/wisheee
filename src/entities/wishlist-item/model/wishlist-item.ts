export type WishlistItem = {
  id: string;
  wishlist_id: string;
  title: string;
  description: string;
  link: string;
  price: number;
  image_url: string | null;
  reserver?: string | null;
};
