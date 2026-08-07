import { useMarkAllAsRead } from "@/entities/notification/model/notification.mutations";
import { Button } from "@/shared/ui/kit/button";
import { CheckCheck } from "lucide-react";

type MarkNotificationsAsReadProps = {
  userId: string | undefined;
  isAvailable: boolean;
};

export function MarkNotificationsAsRead({ userId, isAvailable }: MarkNotificationsAsReadProps) {
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
      disabled={markAsRead.isPending || !isAvailable}
      onClick={handleMarkAllAsRead}
      className="flex w-full items-center gap-2 disabled:opacity-50 sm:w-auto"
    >
      <CheckCheck className="sm:h-4 sm:w-4" />
      Отметить все как прочитанные
    </Button>
  );
}
