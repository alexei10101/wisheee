import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "../api/auth.repository";
import { userKeys } from "./user.queries";
import { userRepository } from "../api/user.repository";
import type { User } from "./user";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await authRepository.login(email, password);
      if (error) throw error;
      return data;
    },
    onMutate: () => {
      const toastId = toast.loading("Вход...");
      return { toastId };
    },
    onSuccess: (data, _vars, ctx) => {
      toast.success("Вы успешно вошли", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      const userId = data.session?.user?.id;
      if (!userId) return;
      prefetchUser(queryClient, userId);
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка авторизации", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, username, password }: { email: string; username: string; password: string }) => {
      const { data: authData, error } = await authRepository.signUp(email, password);
      if (error) throw error;
      if (!authData.user?.id) throw Error("No id");
      const { error: addUsernameError } = await userRepository.update(authData.user.id, { username, avatar_url: "" });
      if (addUsernameError) throw addUsernameError;
      return authData;
    },
    onMutate: () => {
      const toastId = toast.loading("Регистрация...");
      return { toastId };
    },
    onSuccess: (data, _vars, ctx) => {
      toast.success("Регистрация выполнена успешно", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      const userId = data.session?.user?.id;
      if (!userId) return;

      prefetchUser(queryClient, userId);
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка регистрации", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onMutate: () => {
      const toastId = toast.loading("Выход...");
      return { toastId };
    },
    onSuccess: (_data, _vars, ctx) => {
      toast.success("Вы успешно вышли из аккаунта", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["wishlists"] });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка -__-", {
        id: ctx?.toastId,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updateData }: { id: string; updateData: Pick<User, "username"> & { avatar_url: string | null } }) => {
      const { data, error } = await userRepository.update(id, updateData);
      if (error) throw error;
      return data;
    },
    onMutate: () => {
      const toastId = toast.loading("Обновление аккаунта...");
      return { toastId };
    },
    onSuccess: (updated, _vars, ctx) => {
      toast.success("Изменения успешно внесены", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      const userId = updated.id;
      if (!userId) return;

      queryClient.setQueryData(userKeys.me(userId), (user: User) => ({ ...user, ...updated }));
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка внесения изменений", {
        id: ctx?.toastId,
      });
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
      if (!data.avatar_url) return { ...data, avatar_url: "/default-avatar.webp", friends: friendIds };
      return { ...data, friends: friendIds };
    },
  });
};
