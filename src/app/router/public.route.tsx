import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/auth.context";

function PublicRoute() {
  const { session } = useAuth();
  if (session) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default PublicRoute;
