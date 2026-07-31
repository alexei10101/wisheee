import { Outlet } from "react-router";
import { useAuth } from "../auth.context";
import { AppLoader } from "@/shared/ui/app-loader";
import { Toaster } from "sonner";

export function RootLayout() {
  const { isLoading } = useAuth();
  if (isLoading) return <AppLoader />;
  return (
    <>
      <Toaster duration={2000} position="bottom-center" />
      <Outlet />;
    </>
  );
}
