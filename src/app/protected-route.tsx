import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router";
import { UserAuth } from "./auth-context";

function ProtectedRoute() {
  const { session } = UserAuth();
  if (!session) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
