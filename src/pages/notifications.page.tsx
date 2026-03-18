import { notificationService } from "@/entities/notification/model/notification.service";
import { useNotificationStore } from "@/entities/notification/model/notification.store";
import { useAuth } from "@/entities/user/model/use-auth";
import { NotificationList } from "@/features/notification-list/notification.list";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";
import { useEffect } from "react";

function NotificationPage() {
  const { user } = useAuth();
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);

  useEffect(() => {
    async function markRead() {
      if (!user?.id) return;
      const response = await notificationService.markAllNotificationsAsRead(user.id);
      if (response.error) return console.log(response.error);
      markAllAsRead();
    }

    markRead();
  }, [user?.id, markAllAsRead]);

  return (
    <main className="bg-gray-100 min-h-screen px-8">
      <PageHeader style={"pt-30 mb-5"} title="Мои уведомления" left={<BackButton />} />
      <NotificationList />
    </main>
  );
}

export default NotificationPage;
