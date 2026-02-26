import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "@/shared/api/supabase-client";
import type { Profile } from "@/shared/types/profile";

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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) return { error: error };

    setSession(data.session);
    return { error: null };
  };

  // Login
  // TODO: login bag: entering holes
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) return { error: error };

    setSession(data.session);
    return { error: null };
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    setSession(null);
    setProfile(null);
    try {
      supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Edit profile info
  const updateProfile = async (editData: Partial<Profile>): Promise<OperationResult<Profile>> => {
    try {
      const { data, error } = await supabase.from("profiles").update(editData).eq("id", profile?.id).select().single();

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

  // Get initial session
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setProfile(null);
        return;
      }
      setSession(session);
    });
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setProfile(null);
        return;
      }

      setSession(session);

      try {
        const { data, error } = await getUserInfo(session.user.id);

        if (error) {
          console.log(error);
          setProfile(null);
          return;
        }

        setProfile((prev) => {
          // TODO: clg
          console.log('set profile');
          if (!prev) return data;

          if (prev.id === data.id && JSON.stringify(prev.wishlists) === JSON.stringify(data.wishlists)) {
            return prev;
          }

          return data;
        });
      } catch (error) {
        console.log(error);
        setProfile(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // TODO: what about reserved items?

  const getUserInfo = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
            *,
            wishlists (
              *,
              wishlist_items (
                *,
                reserved_gifts (*)
              )
            ),
            friends!friends_user_id_fkey (
              friend_id
            )
          `,
        )
        .eq("id", id)
        .order("created_at", { foreignTable: "wishlists", ascending: false })
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, signUp, login, logout, updateProfile }}>{children}</AuthContext.Provider>
  );

  // TODO: handle OTP authentification
}
