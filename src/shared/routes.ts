export const ROUTES = {
  REGISTER: "/signup",
  LOGIN: "/login",
  HOME: "/",
  WISHLISTS: "/wishlists",
  FRIENDS: "/friends",
  WISHLIST: "/wishlist/:id",
  NOTIFICATIONS: "/notifications",
  USERS: "/users/:userId",
} as const;

export const buildRoutes = {
  wishlist: (id: string) => `/wishlist/${id}`,
  Users: (userId: string) => `/users/${userId}`,
};
