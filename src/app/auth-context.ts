import type { Profile } from "@/shared/types/profile";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, type MouseEventHandler } from "react";

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: Function;
  login: Function;
  logout: MouseEventHandler<HTMLButtonElement>;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  loading: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const UserAuth = () => {
  return useContext(AuthContext);
};
