import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./user.queries";
import type { User } from "./user";
import { userRepository } from "../api/user.repository";

export const useCurrentUser = (enabled?: boolean) => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: userRepository.me,
    staleTime: 1000 * 60 * 5,
    enabled,
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
    queryFn: () => userRepository.getById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
