import { useNotifications } from "@/entities/notification/hooks/use-notifications";
import { UserAuth } from "../contexts/auth.context";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = UserAuth();
  useNotifications(user?.id);

  return <>{children}</>;
}
