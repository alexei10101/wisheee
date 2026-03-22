import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { friendRepository } from "../api/friend.repository";
import type { User } from "../../user/model/user";

type FriendRow = {
  friend: User | User[] | null;
};

export const friendService = {
  async createFriendship(senderId: string, receiverId: string): Promise<ServiceResult> {
    return safeQuery(friendRepository.createFriendship(senderId, receiverId));
  },
  async getFriendsInfo(userId: string): Promise<ServiceResult<User[]>> {
    if (!userId) return { error: "Нет id профиля", result: [] };

    const response = await safeQuery(friendRepository.getFriendsInfo(userId));

    if (response.error) return { error: response.error, result: [] };
    if (!response.result) return { error: "Неизвестная ошибка", result: [] };

    const normalized: User[] = response.result
      .map((item: FriendRow) => {
        if (!item.friend) return null;
        return Array.isArray(item.friend) ? item.friend[0] : item.friend;
      })
      .filter((user): user is User => Boolean(user));

    return { result: normalized, error: null };
  },
  async searchUsers(query: string, id: string): Promise<ServiceResult<User[]>> {
    return safeQuery(friendRepository.searchUsers(query, id));
  },
};
