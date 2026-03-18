import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { friendRepository } from "./friend.repository";
import type { User } from "../user/model/user";

export const friendService = {
  async createFriendship(senderId: string, receiverId: string): Promise<ServiceResult> {
    return safeQuery(friendRepository.createFriendship(senderId, receiverId));
  },
  async getFriendsInfo(friendIds: string[]): Promise<ServiceResult<User[]>> {
    if (!friendIds.length) return { error: null, result: [] };
    return safeQuery(friendRepository.getFriendsInfo(friendIds));
  },
  async searchUsers(query: string, id: string): Promise<ServiceResult<User[]>> {
    return safeQuery(friendRepository.searchUsers(query, id));
  },
};
