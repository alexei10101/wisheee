import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "../api/auth.repository";
import { toast } from "sonner";
import { authKeys } from "./use-current-user";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.signIn,
    onMutate: () => {
      const toastId = toast.loading("Вход...");
      return { toastId };
    },
    onSuccess: (data, __, ctx) => {
      toast.success("Вы успешно вошли", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(authKeys.me(), data);
    },
    onError: (error, _, ctx) => {
      toast.error(error.message, {
        id: ctx?.toastId,
      });
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: authRepository.signUp,
    onMutate: () => {
      const toastId = toast.loading("Регистрация...");
      return { toastId };
    },
    onSuccess: (_, __, ctx) => {
      toast.success("Письмо с подтверждением отправлено на вашу почту.", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
    },
    onError: (error, _, ctx) => {
      toast.error(error.message, {
        id: ctx?.toastId,
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onMutate: () => {
      const toastId = toast.loading("Выход...");
      return { toastId };
    },
    onSuccess: (_, _vars, ctx) => {
      toast.success("Вы вышли из аккаунта", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка -__-", {
        id: ctx?.toastId,
      });
    },
    onSettled: () => queryClient.setQueryData(authKeys.me(), null),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => user,
    // mutationFn: async ({ id, updateData }: { id: string; updateData: Pick<User, "username"> & { avatar_url: string | null } }) => {
    //   const { data, error } = await userRepository.update(id, updateData);
    //   if (error) throw error;
    //   return data;
    // },
    onMutate: () => {
      const toastId = toast.loading("Обновление аккаунта...");
      return { toastId };
    },
    // onSuccess: (updated, _vars, ctx) => {
    //   toast.success("Изменения успешно внесены", {
    //     id: ctx.toastId,
    //     action: {
    //       label: "Ок",
    //       onClick: () => {},
    //     },
    //   });
    //   const userId = updated.id;
    //   if (!userId) return;
    // queryClient.setQueryData(userKeys.me(userId), (user: User) => ({ ...user, ...updated }));
    // },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка внесения изменений", {
        id: ctx?.toastId,
      });
    },
  });
};

// const prefetchUser = async (queryClient: QueryClient, userId: string) => {
//   await queryClient.prefetchQuery({
//     queryKey: userKeys.me(userId),
//     queryFn: async () => {
//       const { data, error } = await userRepository.get(userId);
//       if (error) throw error;
//       const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
//       if (!data.username) return { ...data, username: "Пользователь", friends: friendIds };
//       return { ...data, friends: friendIds };
//     },
//   });
// };
