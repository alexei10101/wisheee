import type { User } from "@/entities/user/model/user";
import { useCurrentUser } from "@/features/auth/model/use-current-user";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const query = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        user: query.data ?? null,
        isLoading: query.isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("auth context error");
  return ctx;
}
