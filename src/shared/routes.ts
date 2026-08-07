export const ROUTES = {
  REGISTER: "/signup",
  SIGNIN: "/signin",
  CHECK_EMAIL: "/check-email",
  // LOGOUT: "/logout",

  HOME: "/",
  MY_WISHLISTS: "/wishlists",
  MY_WISHLIST: "/wishlists/:wishlistId",
  FRIENDS: "/friends",
  NOTIFICATIONS: "/notifications",

  // USER: "/users/:user",
  USER_WISHLISTS: "/users/:userId/wishlists",
  USER_WISHLIST: "/users/:userId/wishlists/:wishlistId",
} as const;

export const buildRoutes = {
  myWishlist: (wishlistId: string) => `/wishlists/${wishlistId}`,
  userWishlists: (userId: string) => `/users/${userId}/wishlists`,
  userWishlist: (userId: string, wishlistId: string) => `/users/${userId}/wishlists/${wishlistId}`,
};
