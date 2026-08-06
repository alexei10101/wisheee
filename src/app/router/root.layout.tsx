import { Outlet } from "react-router";
import { Toaster } from "@/shared/ui/kit/sonner";

export function RootLayout() {
  return (
    <>
      <Toaster duration={2000} position="bottom-center" />
      <Outlet />
    </>
  );
}
