import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../api/user.repository";
import type { User } from "./user";

export const userKeys = {
  me: (userId: string) => ["user", userId ?? ""] as const,
};

export const useUser = (userId?: string | null, options?: { enabled: boolean }) => {
  return useQuery({
    queryKey: userKeys.me(userId!),
    queryFn: async (): Promise<User> => {
      const { data, error } = await userRepository.get(userId!);
      if (error) throw error;

      const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
      if (!data.username) return { ...data, username: "Пользователь", friends: friendIds };
      return { ...data, friends: friendIds };
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });
};
