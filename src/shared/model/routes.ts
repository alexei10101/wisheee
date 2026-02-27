export const ROUTES = {
  REGISTER: "/signup",
  LOGIN: "/login",
  HOME: "/",
  FRIENDS: "/friends",
  WISHLIST: "/wishlist/:id",
} as const;

export const buildRoutes = {
  wishlist: (id: string) => `/wishlist/${id}`,
};
