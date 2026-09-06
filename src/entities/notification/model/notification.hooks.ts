import { useQuery } from "@tanstack/react-query";
import { notificationKeys } from "./notification.queries";
import { notificationRepository } from "../api/notification.repository";

export const useNotificationData = () => {
  return useQuery({
    queryKey: notificationKeys.list,
    queryFn: notificationRepository.getList,
    staleTime: 1000 * 60 * 5,
  });
};

export const useNotifications = () => {
  const { data } = useNotificationData();
  return data?.items ?? [];
};

export const useUnreadNotificationCount = () => {
  const data = useNotificationData();
  return data;
};
