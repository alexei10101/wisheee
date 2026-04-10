import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/shared/routes";
import { lazy } from "react";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";
import App from "../App";
import { AuthProvider } from "../auth.context";
import ProtectedRoute from "./protected.route";
import PublicRoute from "./public.route";
import { RootLayout } from "./root.layout";

const LoginPageLazy = lazy(() => import("../../pages/auth/login.page"));
const SignupPageLazy = lazy(() => import("../../pages/auth/signup.page"));
const CheckEmailPageLazy = lazy(() => import("../../pages/auth/check-email.page"));

const HomePageLazy = lazy(() => import("../../pages/home.page"));
const WishlistsPageLazy = lazy(() => import("../../pages/wishlists.page"));
const WishlistPageLazy = lazy(() => import("../../pages/wishlist.page"));
const FriendsPageLazy = lazy(() => import("../../pages/friends.page"));
const NotificationsPage = lazy(() => import("../../pages/notifications.page"));
const UsersPage = lazy(() => import("../../pages/users.page"));

const router = createBrowserRouter([
  {
    element: (
      <TooltipProvider>
        <AuthProvider>
          <RootLayout>
            <App />
          </RootLayout>
        </AuthProvider>
      </TooltipProvider>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: HomePageLazy },
          { path: ROUTES.FRIENDS, Component: FriendsPageLazy },
          { path: ROUTES.WISHLISTS, Component: WishlistsPageLazy },
          { path: ROUTES.WISHLIST, Component: WishlistPageLazy },
          { path: ROUTES.NOTIFICATIONS, Component: NotificationsPage },
          { path: ROUTES.USERS, Component: UsersPage },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.LOGIN, Component: LoginPageLazy },
          { path: ROUTES.REGISTER, Component: SignupPageLazy },
          { path: ROUTES.CHECK_EMAIL, Component: CheckEmailPageLazy },
        ],
      },
    ],
  },
]);

export default router;
