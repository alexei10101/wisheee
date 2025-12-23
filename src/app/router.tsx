import { createBrowserRouter } from "react-router";
import HomePage from "../features/home/home.page";
import LoginPage from "../features/auth/login.page";
import SignupPage from "../features/auth/signup.page";
import App from "./app";
import { ROUTES } from "@/shared/model/routes";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: ROUTES.HOME, Component: HomePage },
      { path: ROUTES.LOGIN, Component: LoginPage },
      { path: ROUTES.REGISTER, Component: SignupPage },
    ],
  },
]);

export default router;
