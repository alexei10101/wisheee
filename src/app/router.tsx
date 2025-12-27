import { createBrowserRouter } from "react-router";
import HomePage from "../features/home/home.page";
import LoginPage from "../features/auth/login.page";
import SignupPage from "../features/auth/signup.page";
import App from "./app";
import { ROUTES } from "@/shared/model/routes";
import { AuthProvider } from "./auth-provider";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.LOGIN, Component: LoginPage },
          { path: ROUTES.REGISTER, Component: SignupPage },
        ],
      },
    ],
  },
]);

export default router;
