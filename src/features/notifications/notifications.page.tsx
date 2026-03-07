import { UserAuth } from "@/app/auth-context";
import { notificationService } from "@/shared/services/notification-service";
import { Button } from "@/shared/ui/kit/button";
import { useNotificationStore } from "@/store/notification-store";
import { useNavigate } from "react-router";
import NotificationCard from "./notification-card";
import { useCallback } from "react";
import { ItemGroup } from "@/shared/ui/kit/item";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const { profile } = UserAuth();

  const notifications = useNotificationStore().notifications;
  console.log(notifications);

  const handleAcceptingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!profile?.id) return;
      const res = await notificationService.acceptFriendRequest(profile.id, receiverId, requestId);
    },
    [profile?.id],
  );
  const handleRejectingRequest = useCallback(
    async (receiverId: string, requestId: string) => {
      if (!profile?.id) return;
      const res = await notificationService.rejectFriendRequest(profile.id, receiverId, requestId);
    },
    [profile?.id],
  );

  return (
    <section className="pt-25 px-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-5">
        <Button variant="link" onClick={handleBack}>
          ← Назад
        </Button>
      </div>

      <div className="flex gap-5 mb-6 justify-between px-4 text-4xl">Мои уведомления</div>

      {notifications && (
        <ItemGroup>
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onAccept={() => handleAcceptingRequest(n.sender_id, n.event_id)}
              onReject={() => handleRejectingRequest(n.sender_id, n.event_id)}
            />
          ))}
        </ItemGroup>
      )}
    </section>
  );
};

export default NotificationsPage;
