import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { AppHeader } from "@/shared/ui/header/header";
import { useCurrentUser } from "@/entities/user/model/user.hooks";

function ProtectedRoute() {
  const { data } = useCurrentUser();
  if (!data) return <Navigate to={ROUTES.SIGNIN} replace />;

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
