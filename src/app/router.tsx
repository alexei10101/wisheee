import { createBrowserRouter } from "react-router";
import App from "./app";
import { ROUTES } from "@/shared/model/routes";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import AppHeader from "@/features/header";
import { lazy } from "react";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";

const HomePageLazy = lazy(() => import("../features/home/home.page"));
const LoginPageLazy = lazy(() => import("../features/auth/login.page"));
const SignupPageLazy = lazy(() => import("../features/auth/signup.page"));
const FriendsPageLazy = lazy(() => import("../features/friends/friends.page"));
const WishlistPageLazy = lazy(() => import("../features/wishlist/wishlist.page"));

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </AuthProvider>
    ),
    children: [
      {
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          { index: true, Component: HomePageLazy },
          { path: ROUTES.FRIENDS, Component: FriendsPageLazy },
          { path: ROUTES.WISHLIST, Component: WishlistPageLazy },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.LOGIN, Component: LoginPageLazy },
          { path: ROUTES.REGISTER, Component: SignupPageLazy },
        ],
      },
    ],
  },
]);

export default router;
