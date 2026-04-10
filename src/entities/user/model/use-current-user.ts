import { useAuth } from "@/app/auth.context";
import { useUser } from "./user.queries";

export function useCurrentUser() {
  const { userId } = useAuth();
  return useUser(userId);
}
