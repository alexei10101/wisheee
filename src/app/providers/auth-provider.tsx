import { useEffect, useState } from "react";
import { AuthContext } from "../auth-context";
import type { Session } from "@supabase/supabase-js";
import type { Profile } from "@/shared/types/profile";
import type { Wishlist } from "@/shared/types/wishlist";
import { authService } from "@/shared/services/auth.service";
import { profileService } from "@/shared/services/profile.service";

type OperationResult<T = null> = {
  error: string | null;
  result: T | null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);

  // Auth actions
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authService.signUp(email, password);
    setLoading(false);

    if (error) return { error };
    setSession(data.session);
    if (data.session?.user.id) await loadProfile(data.session.user.id);
    return { error: null };
  };
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authService.login(email, password);
    setLoading(false);

    if (error) return { error };
    setSession(data.session);
    if (data.session?.user.id) await loadProfile(data.session.user.id);
    return { error: null };
  };
  const logout = async () => {
    setLoading(true);
    await authService.logout();
    setSession(null);
    setProfile(null);
    setWishlists([]);
    setLoading(false);
  };
  const updateProfile = async (editData: Partial<Profile>): Promise<OperationResult<Profile>> => {
    if (!profile?.id) return { error: "Отсутствует id профиля", result: null };

    try {
      const { data, error } = await profileService.updateProfile(profile.id, editData);

      if (error) return { error: error.message, result: null };

      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
      setWishlists(data.wishlists ?? wishlists);

      return { error: null, result: data };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Неизвестная ошибка", result: null };
    }
  };

  // Load profile
  const loadProfile = async (userId: string) => {
    setLoading(true);
    const { data, error } = await profileService.getProfile(userId);

    if (!error && data) {
      setProfile(data);
      setWishlists(data.wishlists ?? []);
    } else {
      setProfile(null);
      setWishlists([]);
    }

    setLoading(false);
  };

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = authService.onAuthStateChange((event, session) => {
      setSession(session);

      if (session?.user.id) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
        setWishlists([]);
      }

      if (event === "INITIAL_SESSION") {
        setAppReady(true);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        wishlists,
        setWishlists,
        loading,
        appReady,
        signUp,
        login,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
