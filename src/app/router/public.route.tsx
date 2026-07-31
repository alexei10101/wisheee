import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth.context";

function PublicRoute() {
  const { user } = useAuth();
  if (user) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default PublicRoute;
