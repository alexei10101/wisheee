import { supabase } from "../api/supabase-client";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

export const authService = {
  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },

  async login(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async logout() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
