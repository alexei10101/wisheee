export const ROUTES = {
  REGISTER: "/signup",
  LOGIN: "/login",
  HOME: "/",
  FRIENDS: "/friends",
  WISHLIST: "/wishlist/:id",
  NOTIFICATIONS: "/notifications",
} as const;

export const buildRoutes = {
  wishlist: (id: string) => `/wishlist/${id}`,
};
