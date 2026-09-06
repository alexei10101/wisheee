import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/shared/routes";
import { lazy } from "react";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";
import ProtectedRoute from "./protected.route";
import PublicRoute from "./public.route";
import { RootLayout } from "./root.layout";
import ErrorPage from "@/pages/not-found/404.page";
import AppInitializer from "../app-initializer";

const SignInPageLazy = lazy(() => import("../../pages/auth/signin.page"));
const SignupPageLazy = lazy(() => import("../../pages/auth/signup.page"));
const CheckEmailPageLazy = lazy(() => import("../../pages/auth/check-email.page"));

const HomePageLazy = lazy(() => import("../../pages/profile/my-profile.page"));

const MyWishlistsPageLazy = lazy(() => import("../../pages/wishlist/my-wishlists.page"));
const UserWishlistsPageLazy = lazy(() => import("../../pages/wishlist/user-wishlists.page"));

const FriendsPageLazy = lazy(() => import("../../pages/friends.page"));

const MyWishlistPageLazy = lazy(() => import("../../pages/wishlist/my-wishlist.page"));
const UserWishlistPageLazy = lazy(() => import("../../pages/wishlist/user-wishlist.page"));
const NotificationsLazy = lazy(() => import("../../pages/notifications.page"));

const router = createBrowserRouter([
  {
    element: (
      <AppInitializer>
        <TooltipProvider>
          <RootLayout />
        </TooltipProvider>
      </AppInitializer>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: HomePageLazy },
          { path: ROUTES.MY_WISHLISTS, Component: MyWishlistsPageLazy },
          { path: ROUTES.FRIENDS, Component: FriendsPageLazy },
          { path: ROUTES.MY_WISHLIST, Component: MyWishlistPageLazy },
          { path: ROUTES.NOTIFICATIONS, Component: NotificationsLazy },

          { path: ROUTES.USER_WISHLISTS, Component: UserWishlistsPageLazy },
          { path: ROUTES.USER_WISHLIST, Component: UserWishlistPageLazy },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.SIGNIN, Component: SignInPageLazy },
          { path: ROUTES.REGISTER, Component: SignupPageLazy },
          { path: ROUTES.CHECK_EMAIL, Component: CheckEmailPageLazy },
        ],
      },
    ],
  },
]);

export default router;
