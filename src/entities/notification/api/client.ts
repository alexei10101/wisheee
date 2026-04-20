import type { FriendRequestStatus } from "@/entities/request/friend-request/model/friend-request";
import { callEdge, EdgeOperation } from "@/shared/api/edge-client";
import type { ApiResponse } from "@/shared/api/edge-response.type";

export const notificationApi = {
  async updateFriendRequestStatus(
    access_token: string,
    entityId: string,
    status: Omit<FriendRequestStatus, "pending">,
  ): Promise<ApiResponse> {
    const body = {
      entityId,
      status,
    };

    return callEdge(EdgeOperation.updateFriendNotification, access_token, body);
  },
};
