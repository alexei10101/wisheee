export const wishlistItemsKeys = {
  all: ["wishlist-items"] as const,
  list: (wishlistId: string) => ["wishlist-items", "wishlist", wishlistId] as const,
  // detail: (itemId: string) => ["wishlist-items", "detail", itemId],
};
