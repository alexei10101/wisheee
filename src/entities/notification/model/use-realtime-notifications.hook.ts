import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notification.queries";
import { realtimeClient } from "@/shared/api/realtime-client";

export function useRealtimeNotifications(userId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) {
      realtimeClient.disconnect();
      return;
    }

    const refreshNotifications = () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list,
      });
    };

    realtimeClient.on("connect", refreshNotifications);
    realtimeClient.on("notifications:changed", refreshNotifications);

    realtimeClient.connect();

    return () => {
      realtimeClient.off("connect", refreshNotifications);
      realtimeClient.off("notifications:changed", refreshNotifications);
      realtimeClient.disconnect();
    };
  }, [userId, queryClient]);
}
