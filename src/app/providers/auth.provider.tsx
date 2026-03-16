import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import type { Session } from "@supabase/supabase-js";
import { userRepository } from "@/entities/user/user.repository";
import { authRepository } from "@/entities/user/auth.repository";
import type { User } from "@/entities/user/user";

type OperationResult<T = null> = {
  error: string | null;
  result: T | null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);

  // Auth actions
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authRepository.signUp(email, password);
    setLoading(false);

    if (error) return { error };
    setSession(data.session);
    if (data.session?.user.id) await loadUser(data.session.user.id);
    return { error: null };
  };
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authRepository.login(email, password);
    setLoading(false);

    if (error) return { error };
    setSession(data.session);
    if (data.session?.user.id) await loadUser(data.session.user.id);
    return { error: null };
  };
  const logout = async () => {
    setLoading(true);
    await authRepository.logout();
    setSession(null);
    setUser(null);
    setLoading(false);
  };
  const updateUser = async (editData: Partial<User>): Promise<OperationResult<User>> => {
    if (!user?.id) return { error: "Отсутствует id профиля", result: null };

    try {
      const { data, error } = await userRepository.update(user.id, editData);

      if (error) return { error: error.message, result: null };

      setUser((prev) => (prev ? { ...prev, ...data } : prev));

      return { error: null, result: data };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Неизвестная ошибка", result: null };
    }
  };

  // Load profile
  const loadUser = useCallback(async (userId: string) => {
    setLoading(true);

    const { data, error } = await userRepository.get(userId);

    if (!error && data) {
      const friendIds = data.friends?.map((f: { friend_id: string }) => f.friend_id) ?? [];
      setUser({ ...data, friends: friendIds });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Listen for auth changes
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data } = await authRepository.getSession();
      const session = data.session;

      if (!mounted) return;

      setSession(session);

      if (session?.user?.id) {
        await loadUser(session.user.id);
      }

      setAppReady(true);
      setLoading(false);
    };

    initSession();

    const {
      data: { subscription },
    } = authRepository.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        appReady,

        signUp,
        login,
        logout,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
