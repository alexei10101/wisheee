import type { Profile } from "@/shared/types/profile";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: Function;
  login: Function;
  logout: Function;
  updateProfile: Function;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  loading: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const UserAuth = () => {
  return useContext(AuthContext);
};
