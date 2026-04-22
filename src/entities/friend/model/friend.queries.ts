import { useQuery } from "@tanstack/react-query";
import { friendService } from "./friend.service";
import { unwrap } from "@/shared/api/helper-unwrap";
import type { User } from "@/entities/user/model/user";

export const friendsKeys = {
  all: () => ["friends"],
  list: (userId: string) => ["friends", userId ?? ""],
};

export const useFriends = (userId: string | undefined) =>
  useQuery({
    queryKey: friendsKeys.list(userId ?? ""),
    queryFn: async (): Promise<User[]> => {
      if (!userId) return [];
      const response = await friendService.getFriendsInfo(userId);
      return unwrap(response);
    },
    enabled: !!userId,
  });
