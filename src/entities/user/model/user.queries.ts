import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../api/user.repository";
import type { User } from "./user";

export const userKeys = {
  me: (userId: string) => ["user", userId ?? ""] as const,
};

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: userKeys.me(userId!),
    queryFn: async (): Promise<User> => {
      const { data, error } = await userRepository.get(userId!);
      if (error) throw error;

      const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
      return { ...data, friends: friendIds };
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
