import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";

export const userKeys = {
  me: () => ["current-user"] as const,
  user: (userId: string) => ["user", userId] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userService.me,
    staleTime: 1000 * 60 * 5,
    gcTime: 30 * 60 * 1000,
  });
};
// queryFn: async (): Promise<User> => {
//   const { data, error } = await userRepository.get(userId!);
//   if (error) throw error;

//   const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
//   if (!data.username) return { ...data, username: "Пользователь", friends: friendIds };
//   return { ...data, friends: friendIds };
// },
export const useUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: userKeys.user(userId!),
    queryFn: () => userService.getById(userId!),
    // queryFn: async (): Promise<User> => {
    //   const user = await userService.getById(userId!);
    //   if (error) throw error;

    //   const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
    //   if (!data.username) return { ...data, username: "Пользователь", friends: friendIds };
    //   return { ...data, friends: friendIds };
    // },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 30 * 60 * 1000,
  });
};
