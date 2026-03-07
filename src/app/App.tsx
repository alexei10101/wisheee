import { useRealtimeNotifications } from "@/shared/hooks/use-realtime-notifications";
import { Outlet } from "react-router";
import { UserAuth } from "./auth-context";
import { useEffect } from "react";
import { notificationService } from "@/shared/services/notification-service";
import { useNotificationStore } from "@/store/notification-store";

export function App() {
  const { profile } = UserAuth();

  useRealtimeNotifications(profile?.id);

  useEffect(() => {
    async function load() {
      if (!profile?.id) return;

      const data = await notificationService.fetchNotifications(profile.id);

      useNotificationStore.getState().setNotifications(data.result ?? []);
    }

    load();
  }, [profile?.id]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
