import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router";
import { UserAuth } from "./auth-context";

function PublicRoute() {
  const { session } = UserAuth();
  if (session) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return <Outlet />;
}

export default PublicRoute;
