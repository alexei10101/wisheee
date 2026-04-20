import { useNotifications } from "@/entities/notification/model/notification.queries";
import { MarkNotificationsAsRead } from "@/features/notification/mark-notifications-as-read.button";
import { NotificationList } from "@/features/notification/notification-list/notification.list";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { PageLoader } from "@/shared/ui/page-loader";

function NotificationPage() {
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const { data: notifications, isLoading: notificationsIsLoading } = useNotifications(user?.id);

  if (userIsLoading || notificationsIsLoading) return <PageLoader />;
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
