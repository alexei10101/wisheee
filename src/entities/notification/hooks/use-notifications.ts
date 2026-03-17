import { useEffect } from "react";
import { useRealtimeNotifications } from "./use-realtime-notifications.hook";
import { notificationService } from "../model/notification.service";
import { useNotificationStore } from "../model/notification.store";

export function useNotifications(userId?: string) {
  useRealtimeNotifications(userId);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      const data = await notificationService.fetchNotifications(userId);

      useNotificationStore.getState().setNotifications(data.result ?? []);
    }

    load();
  }, [userId]);
}
