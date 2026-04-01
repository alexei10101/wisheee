import { useNotifications } from "@/entities/notification/model/notification.queries";
import { useAuth } from "@/entities/user/model/use-auth";
import { MarkNotificationsAsRead } from "@/features/notification/mark-notifications-as-read.button";
import { NotificationList } from "@/features/notification/notification-list/notification.list";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";

function NotificationPage() {
  const { user } = useAuth();
  const { data: notifications } = useNotifications(user?.id);

  return (
    <main className="bg-gray-100 min-h-screen pt-25 sm:pt-30 px-2 sm:px-8">
      <div className="mb-3 sm:mb-5">
        <PageHeader title="Мои уведомления" left={<BackButton />} right={<MarkNotificationsAsRead userId={user?.id} />} />
      </div>

      <NotificationList userId={user?.id} notifications={notifications ?? []} />
    </main>
  );
}

export default NotificationPage;
