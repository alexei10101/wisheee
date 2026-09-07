import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "../api/auth.repository";
import { toast } from "sonner";
import { userKeys } from "@/entities/user/model/user.queries";
import { useNavigate } from "react-router";

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
      queryClient.setQueryData(userKeys.me, data);
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authRepository.logout,
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
      navigate("/signIn");
      setTimeout(() => {
        queryClient.clear();
      });
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка -__-", {
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
