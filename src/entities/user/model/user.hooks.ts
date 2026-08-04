import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./user.queries";
import { userService } from "./user.service";
import type { User } from "./user";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userService.me,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRequiredUser = (): User => {
  const data = useCurrentUser();
  if (!data.data) throw new Error("useRequiredUser must be used inside ProtectedRoute");
  return data.data;
};

export const useUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: userKeys.user(userId!),
    queryFn: () => userService.getById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
