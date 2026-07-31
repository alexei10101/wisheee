import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { AppHeader } from "@/shared/ui/header/header";
import { useAuth } from "../auth.context";

function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to={ROUTES.SIGNIN} replace />;

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
