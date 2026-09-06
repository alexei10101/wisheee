import { useRealtimeNotifications } from "@/entities/notification/model/use-realtime-notifications.hook";
import { useCurrentUser } from "@/entities/user/model/user.hooks";
import { userKeys } from "@/entities/user/model/user.queries";
import { authRepository } from "@/features/auth/api/auth.repository";
import { AppLoader } from "@/shared/ui/app-loader";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser(false);
  useRealtimeNotifications(user?.id);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const user = await authRepository.init();

        queryClient.setQueryData(userKeys.me, user);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    };

    bootstrap();
  }, [queryClient]);

  if (!ready) return <AppLoader />;
  return <>{children}</>;
}

export default AppInitializer;
