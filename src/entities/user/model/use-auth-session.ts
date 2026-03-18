import { useEffect, useState } from "react";
import { authRepository } from "../api/auth.repository";
import type { Session } from "@supabase/supabase-js";

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await authRepository.getSession();
      setSession(data.session);
      setAppReady(true);
    };

    init();

    const {
      data: { subscription },
    } = authRepository.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") setSession(null);
      else if (session) setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, userId: session?.user?.id ?? null, appReady };
};
