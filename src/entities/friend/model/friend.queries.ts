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
      const friends = unwrap(response);
      const friendsWithCorrectImages = friends.map((friend) =>
        friend.avatar_url ? friend : { ...friend, avatar_url: "/default-avatar.webp" },
      );
      return friendsWithCorrectImages;
    },
    enabled: !!userId,
  });
