import { useEffect, useState } from "react";
import { AuthContext } from "../auth-context";
import { type Session } from "@supabase/supabase-js";
import type { Profile } from "@/shared/types/profile";
import { authService } from "@/shared/services/auth.service";
import { profileService } from "@/shared/services/profile.service";

type OperationResult<T = null> = {
  error: string | null;
  result: T | null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sign up
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authService.signUp(email, password);
    setLoading(false);

    if (error) return { error: error };

    setSession(data.session);
    return { error: null };
  };

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await authService.login(email, password);
    setLoading(false);

    if (error) return { error };

    setSession(data.session);
    return { error: null };
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    await authService.logout();
    setLoading(false);
    setSession(null);
    setProfile(null);
  };

  // Get initial session
  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
      } = await authService.getSession();

      setSession(session ?? null);
      setLoading(false);
    };

    initSession();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = authService.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Get profile info
  useEffect(() => {
    if (!session?.user.id) {
      setProfile(null);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      const { data, error } = await profileService.getProfile(session.user.id);

      if (!isMounted) return;

      if (error) {
        console.error(error);
        setProfile(null);
        return;
      }

      setProfile(data);
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [session]);

  // Edit profile info
  const updateProfile = async (editData: Partial<Profile>): Promise<OperationResult<Profile>> => {
    if (!profile?.id) return { error: "No profile id", result: null };
    try {
      const { data, error } = await profileService.updateProfile(profile.id, editData);

      if (error) {
        return {
          error: "Не удалось обновить данные: " + error.message,
          result: null,
        };
      }

      setProfile((prev) => (prev ? { ...prev, ...data } : prev));

      return { error: null, result: data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        result: null,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, signUp, login, logout, updateProfile }}>{children}</AuthContext.Provider>
  );

  // TODO: handle OTP authentification
}
