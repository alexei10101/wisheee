import { useQuery } from "@tanstack/react-query";
import { authRepository } from "../api/auth.repository";

export const authKeys = {
  me: () => ["current-user"] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authRepository.init,
    retry: false,

    staleTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
