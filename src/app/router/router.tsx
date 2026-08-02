import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/shared/routes";
import { lazy } from "react";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";
import ProtectedRoute from "./protected.route";
import PublicRoute from "./public.route";
import { RootLayout } from "./root.layout";
import ErrorPage from "@/pages/404.page";
import AppInitializer from "../app-initializer";

const SignInPageLazy = lazy(() => import("../../pages/auth/signin.page"));
const SignupPageLazy = lazy(() => import("../../pages/auth/signup.page"));
const CheckEmailPageLazy = lazy(() => import("../../pages/auth/check-email.page"));

const HomePageLazy = lazy(() => import("../../pages/home.page"));
// const WishlistsPageLazy = lazy(() => import("../../pages/wishlists.page"));
// const WishlistPageLazy = lazy(() => import("../../pages/wishlist.page"));
// const FriendsPageLazy = lazy(() => import("../../pages/friends.page"));
// const NotificationsLazy = lazy(() => import("../../pages/notifications.page"));

// const AddFromShareLazy = lazy(() => import("../../pages/add-from-share.page"));

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <TooltipProvider>
          <RootLayout />
        </TooltipProvider>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: HomePageLazy },
          // { path: ROUTES.FRIENDS, Component: FriendsPageLazy },
          // { path: ROUTES.MY_WISHLIST, Component: WishlistPageLazy },
          // { path: ROUTES.MY_WISHLISTS, Component: WishlistsPageLazy },
          // { path: ROUTES.NOTIFICATIONS, Component: NotificationsLazy },

          // { path: ROUTES.USER_WISHLISTS, Component: WishlistsPageLazy },
          // { path: ROUTES.USER_WISHLIST, Component: WishlistPageLazy },
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
      // {
      //   path: ROUTES.ADD_FROM_SHARE,
      //   Component: AddFromShareLazy,
      // },
    ],
  },
]);

export default router;
