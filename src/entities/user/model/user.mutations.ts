import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "./user";
import { userRepository } from "../api/user.repository";
import { toast } from "sonner";
import { userKeys } from "./user.queries";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userRepository.update,
    onMutate: () => {
      const toastId = toast.loading("Обновление аккаунта...");
      return { toastId };
    },
    onSuccess: (updated, _vars, ctx) => {
      toast.success("Изменения успешно внесены.", {
        id: ctx.toastId,
        action: {
          label: "Ок",
          onClick: () => {},
        },
      });
      queryClient.setQueryData(userKeys.me, (user: User) => ({ ...user, ...updated }));
    },
    onError: (_err, _vars, ctx) => {
      toast.error("Ошибка внесения изменений", {
        id: ctx?.toastId,
      });
    },
  });
};
