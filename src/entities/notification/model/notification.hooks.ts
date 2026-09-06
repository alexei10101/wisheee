import { useQuery } from "@tanstack/react-query";
import { notificationKeys } from "./notification.queries";
import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";
import type { AppNotificationResponse } from "./notification";

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<AppNotificationResponse>>("/notifications");
      return data.data.items;
    },
    staleTime: 1000 * 60 * 5,
  });
};
