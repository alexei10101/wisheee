import type { User } from "@/entities/user/model/user";
import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";

export const friendsRepository = {
  async getList(userId?: string) {
    const url = userId ? `/users/${userId}/friends` : "/friends";
    const { data } = await api.get<ApiResponse<User[]>>(url);
    return data.data;
  },
};
