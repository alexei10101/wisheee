import { authRepository } from "@/entities/user/api/auth.repository";
import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  session: Session | null;
  appReady: boolean;
  userId: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = authRepository.onAuthStateChange((_event, session) => {
      setSession(session);
      setAppReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, appReady, userId: session?.user?.id ?? null }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
