import type { User } from "@/entities/user/user";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  appReady: boolean;
  signUp: Function;
  login: Function;
  logout: Function;
  updateUser: Function;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: false,
  appReady: false,

  signUp: () => {},
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const UserAuth = () => {
  return useContext(AuthContext);
};
