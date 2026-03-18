import { ROUTES } from "@/shared/routes";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Suspense } from "react";
import { useAuth } from "@/entities/user/model/use-auth";

function ProtectedRoute() {
  const { session, appReady } = useAuth();

  if (!appReady)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );

  if (!session) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <Spinner />
        </div>
      }>
      <Outlet />
    </Suspense>
  );
}

export default ProtectedRoute;
