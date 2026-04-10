import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/auth.context";
import { AppHeader } from "@/shared/ui/header/header";

function ProtectedRoute() {
  const { session } = useAuth();
  if (!session) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
