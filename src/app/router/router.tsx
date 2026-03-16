import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/shared/routes";
import { AuthProvider } from "../providers/auth.provider";
import { lazy } from "react";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";
import App from "../app";
import { ProtectedLayout } from "./layouts/protected.layout";
import { PublicLayout } from "./layouts/public.layout";
import { WishlistProvider } from "../providers/wishlist.provider";
import { NotificationProvider } from "../providers/notification.provider";

const HomePageLazy = lazy(() => import("../../pages/home.page"));
const LoginPageLazy = lazy(() => import("../../pages/auth/login.page"));
const SignupPageLazy = lazy(() => import("../../pages/auth/signup.page"));
const FriendsPageLazy = lazy(() => import("../../pages/friends.page"));
const WishlistPageLazy = lazy(() => import("../../pages/wishlist.page"));
const NotificationsPage = lazy(() => import("../../pages/notifications.page"));

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <NotificationProvider>
          <WishlistProvider>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </WishlistProvider>
        </NotificationProvider>
      </AuthProvider>
    ),
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          { index: true, Component: HomePageLazy },
          { path: ROUTES.FRIENDS, Component: FriendsPageLazy },
          { path: ROUTES.WISHLIST, Component: WishlistPageLazy },
          { path: ROUTES.NOTIFICATIONS, Component: NotificationsPage },
        ],
      },
      {
        element: <PublicLayout />,
        children: [
          { path: ROUTES.LOGIN, Component: LoginPageLazy },
          { path: ROUTES.REGISTER, Component: SignupPageLazy },
        ],
      },
    ],
  },
]);

export default router;
