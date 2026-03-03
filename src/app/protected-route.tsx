import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router";
import { UserAuth } from "./auth-context";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Suspense } from "react";

function ProtectedRoute() {
  const { session, appReady } = UserAuth();

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
