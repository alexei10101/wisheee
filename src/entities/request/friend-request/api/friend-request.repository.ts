import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";
import type { SendRequestResult } from "./friend-request.responses";
import type { User } from "@/entities/user/model/user";

export const friendRequestRepository = {
  async createRequest(addresseeId: string): Promise<SendRequestResult> {
    const { data } = await api.post<ApiResponse<SendRequestResult>>("/friends/requests", {
      addresseeId,
    });
    return data.data;
  },
  async acceptRequest(requestId: string): Promise<User> {
    const { data } = await api.post<ApiResponse<User>>(`/friends/requests/${requestId}/accept`);
    return data.data;
  },
  async rejectRequest(requestId: string): Promise<null> {
    await api.post<ApiResponse<null>>(`/friends/requests/${requestId}/reject`);
    return null;
  },
  async deleteRequest(requestId: string): Promise<null> {
    await api.delete<ApiResponse<null>>(`/friends/requests/${requestId}`);
    return null;
  },
};
