import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "@/shared/api/supabase-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sign up
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(true);

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
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    setSession(null);

    if (error) return { error: error };
  };

  // Get initial session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, loading, signUp, login, logout }}>{children}</AuthContext.Provider>;
}
