export const wishlistKeys = {
  all: ["wishlists"] as const,
  my: ["wishlists", "me"] as const,
  user: (userId: string) => ["wishlists", "user", userId] as const,
  // detail: (wishlistId: string) => ["wishlists", "detail", wishlistId],
};
