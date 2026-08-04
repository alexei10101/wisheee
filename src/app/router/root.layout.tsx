import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function RootLayout() {
  return (
    <>
      <Toaster duration={2000} position="bottom-center" />
      <Outlet />
    </>
  );
}
