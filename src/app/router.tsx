import { createBrowserRouter } from "react-router";
import AuthPage from "../features/auth/Auth.page";
import HeroPage from "../features/hero/Hero.page";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", Component: HeroPage },
      { path: "auth", Component: AuthPage },
    ],
  },
]);

export default router;
