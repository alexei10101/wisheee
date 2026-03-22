import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "../api/auth.repository";
import { userKeys } from "./user.queries";
import { userRepository } from "../api/user.repository";
import type { User } from "./user";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await authRepository.login(email, password);
      if (error) throw error;
      return data;
    },

    onSuccess: (data) => {
      const userId = data.session?.user?.id;
      if (!userId) return;

      prefetchUser(queryClient, userId);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await authRepository.signUp(email, password);
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      const userId = data.session?.user?.id;
      if (!userId) return;

      prefetchUser(queryClient, userId);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["wishlists"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updateData }: { id: string; updateData: Pick<User, "username" | "avatarLink"> }) => {
      const { data, error } = await userRepository.update(id, updateData);
      if (error) throw error;
      return data;
    },
    onSuccess: (updated) => {
      const userId = updated.id;
      if (!userId) return;

      queryClient.setQueryData(userKeys.me(userId), (user: User) => ({ ...user, ...updated }));
    },
  });
};

const prefetchUser = async (queryClient: QueryClient, userId: string) => {
  await queryClient.prefetchQuery({
    queryKey: userKeys.me(userId),
    queryFn: async () => {
      const { data, error } = await userRepository.get(userId);
      if (error) throw error;
      const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
      return { ...data, friends: friendIds };
    },
  });
};
