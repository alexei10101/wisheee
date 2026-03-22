import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notification.queries";
import { notificationService } from "./notification.service";
import type { AppNotification } from "./notification";

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => notificationService.markAllNotificationsAsRead(userId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(notificationKeys.friendRequest(variables.userId), (old: AppNotification[] = []) => {
        const seen = new Set();
        return old
          .filter((n) => {
            if (!n.id || seen.has(n.id)) return false;
            seen.add(n.id);
            return true;
          })
          .map((n) => ({ ...n, is_read: true }));
      });
    },
  });
};
