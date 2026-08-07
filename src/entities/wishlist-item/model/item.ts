export type WishlistItem = {
  id: string;
  wishlistId: string;
  title: string;
  description: string;
  link: string;
  price: number | null;
  image: string;
  reserver: string | null;
  createdAt: Date;
};
