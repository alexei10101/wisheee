import { useAuthSession } from "./use-auth-session";
import { useUser } from "./user.queries";

export const useAuth = () => {
  const { session, userId, appReady } = useAuthSession();
  const { data: user, isLoading } = useUser(userId);

  return {
    session,
    user,
    loading: isLoading,
    appReady,
  };
};
