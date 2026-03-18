import { useNotifications } from "@/entities/notification/hooks/use-notifications";
import { useAuth } from "@/entities/user/model/use-auth";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  useNotifications(user?.id);

  return <>{children}</>;
}
