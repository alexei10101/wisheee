import { useQuery } from "@tanstack/react-query";
import { notificationService } from "./notification.service";
import { unwrap } from "@/shared/api/helper-unwrap";
import { useRealtimeNotifications } from "../hooks/use-realtime-notifications.hook";

export const notificationKeys = {
  all: () => ["notification"],
  friendRequest: (userId: string) => ["notification", "friend", userId],
};

export const useNotifications = (userId?: string) => {
  useRealtimeNotifications(userId);
  return useQuery({
    queryKey: notificationKeys.friendRequest(userId ?? ""),
    queryFn: async () => {
      const result = await notificationService.fetchNotifications(userId!);
      return unwrap(result);
    },
    enabled: !!userId,
  });
};
