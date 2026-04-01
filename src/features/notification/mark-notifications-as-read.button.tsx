import { useMarkAllAsRead } from "@/entities/notification/model/notification.mutations";
import { Button } from "@/shared/ui/kit/button";
import { CheckCheck } from "lucide-react";

type MarkNotificationsAsReadProps = {
  userId: string | undefined;
};

export function MarkNotificationsAsRead({ userId }: MarkNotificationsAsReadProps) {
  const markAsRead = useMarkAllAsRead();

  const handleMarkAllAsRead = async () => {
    if (!userId) return;
    try {
      await markAsRead.mutateAsync({ userId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      disabled={markAsRead.isPending}
      onClick={handleMarkAllAsRead}
      className="flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto">
      <CheckCheck className="sm:w-4 sm:h-4" />
      Отметить все как прочитанные
    </Button>
  );
}
