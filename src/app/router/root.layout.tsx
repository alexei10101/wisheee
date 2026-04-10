import { useAuth } from "../auth.context";
import { AppLoader } from "@/shared/ui/app-loader";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { appReady } = useAuth();
  if (!appReady) return <AppLoader />;
  return <>{children}</>;
}
