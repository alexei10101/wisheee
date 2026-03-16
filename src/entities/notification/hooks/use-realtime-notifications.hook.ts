import { useNotificationStore } from "@/entities/notification/model/notification.store";
import { useEffect } from "react";
import { notificationRepository } from "../api/notification.repository";
import type { AppNotification } from "../model/notification";

export function useRealtimeNotifications(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;

    const handler = (notification: AppNotification) => {
      const exists = useNotificationStore.getState().notifications.some((n) => n.id === notification.id);
      if (exists) {
        useNotificationStore.getState().updateNotification(notification);
      } else {
        useNotificationStore.getState().addNotification(notification);
      }
    };

    const channel = notificationRepository.subscribe(userId, handler, handler);

    return () => {
      notificationRepository.unsubscribe(channel);
    };
  }, [userId]);
}
