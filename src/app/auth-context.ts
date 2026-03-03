import type { Profile } from "@/shared/types/profile";
import type { Wishlist } from "@/shared/types/wishlist";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  wishlists: Wishlist[];
  setWishlists: React.Dispatch<React.SetStateAction<Wishlist[]>>;
  loading: boolean;
  appReady: boolean;
  signUp: Function;
  login: Function;
  logout: Function;
  updateProfile: Function;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  wishlists: [],
  setWishlists: () => {},
  loading: false,
  appReady: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const UserAuth = () => {
  return useContext(AuthContext);
};
