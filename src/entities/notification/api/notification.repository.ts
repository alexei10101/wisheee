import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";
import type { AppNotificationResponse } from "../model/notification";

export const notificationRepository = {
  async getList() {
    const { data } = await api.get<ApiResponse<AppNotificationResponse>>("/notifications");
    return data.data;
  },
};
