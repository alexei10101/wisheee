import ProtectedRoute from "@/app/router/protected.route";
import { AppHeader } from "@/shared/ui/header/header";

export function ProtectedLayout() {
  return (
    <>
      <AppHeader />
      <ProtectedRoute />
    </>
  );
}
