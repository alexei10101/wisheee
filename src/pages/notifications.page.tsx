import { NotificationList } from "@/features/notification/notification-list/notification.list";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";
import { AppLoader } from "@/shared/ui/app-loader";
import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { useNotifications } from "@/entities/notification/model/notification.hooks";

function NotificationPage() {
  const user = useRequiredUser();
  const notifications = useNotifications();
  // const { data: notifications, isLoading: notificationsIsLoading } = useNotifications(user?.id);
  // const haveNotificationsBeenRead =
  //   notifications?.some((notification) => !notification.is_read) ?? false;

  if (!user) return <AppLoader />;
  return (
    <main className="page bg-background">
      {/* <div className="mb-3 sm:mb-5">
        <PageHeader
          title="Мои уведомления"
          left={<BackButton />}
          right={
            <MarkNotificationsAsRead userId={user?.id} isAvailable={haveNotificationsBeenRead} />
          }
        />
      </div> */}
      <div className="mb-3 sm:mb-5">
        <PageHeader title="Мои уведомления" left={<BackButton />} />
      </div>
      <NotificationList userId={user.id} notifications={notifications ?? []} />
    </main>
  );
}

export default NotificationPage;
