import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "@/entities/user/model/user.queries";

function PublicRoute() {
  const { data } = useCurrentUser();
  if (data) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}

export default PublicRoute;
