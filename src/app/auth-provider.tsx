import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "@/shared/api/supabase-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  // TODO: profile type
  const [profile, setProfile] = useState<any>(null);
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
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

        setProfile(data);
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

  return <AuthContext.Provider value={{ session, profile, loading, signUp, login, logout }}>{children}</AuthContext.Provider>;

  // TODO: handle OTP authentification
}
