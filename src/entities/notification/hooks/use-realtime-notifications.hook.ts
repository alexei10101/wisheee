import { useEffect } from "react";
import { notificationRepository } from "../api/notification.repository";
import type { AppNotification } from "../model/notification";
import { useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "../model/notification.queries";

export function useRealtimeNotifications(userId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const handlerInsert = (notification: AppNotification) => {
      queryClient.setQueryData(notificationKeys.friendRequest(userId), (old: AppNotification[] = []) => [notification, ...old]);
    };
    const handlerUpdate = (notification: AppNotification) => {
      queryClient.setQueryData(notificationKeys.friendRequest(userId), (old: AppNotification[] = []) =>
        old.map((n) => (n.id === notification.id ? notification : n)),
      );
    };

    const channel = notificationRepository.subscribe(userId, handlerInsert, handlerUpdate);

    return () => {
      notificationRepository.unsubscribe(channel);
    };
  }, [userId, queryClient]);
}
