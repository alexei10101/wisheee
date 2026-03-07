import { useNotificationStore } from "@/store/notification-store";
import { useEffect } from "react";
import { supabase } from "../api/supabase-client";

export function useRealtimeNotifications(userId: string | undefined) {
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiverId=eq.${userId}`,
        },
        (payload) => {
          addNotification(payload.new as any);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
}
