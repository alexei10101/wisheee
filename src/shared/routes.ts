export const ROUTES = {
  REGISTER: "/signup",
  LOGIN: "/login",
  CHECK_EMAIL: "/check-email",

  HOME: "/",
  MY_WISHLISTS: "/wishlists",
  MY_WISHLIST: "/wishlists/:id",
  FRIENDS: "/friends",
  NOTIFICATIONS: "/notifications",

  // USER: "/users/:user",
  USER_WISHLISTS: "/users/:userId/wishlists",
  USER_WISHLIST: "/users/:userId/wishlists/:id",

  ADD_FROM_SHARE: "/add-from-share",
} as const;

export const buildRoutes = {
  myWishlist: (wishlistId: string) => `/wishlists/${wishlistId}`,
  userWishlists: (userId: string) => `/users/${userId}/wishlists`,
  userWishlist: (userId: string, wishlistId: string) => `/users/${userId}/wishlists/${wishlistId}`,
};
