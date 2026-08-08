import { useCurrentUser } from "@/entities/user/model/user.hooks";
import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const { data } = useCurrentUser(false);
  if (data) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default PublicRoute;
