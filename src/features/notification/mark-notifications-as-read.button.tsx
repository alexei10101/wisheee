import { useMarkAllAsRead } from "@/entities/notification/model/notification.mutations";
import { Button } from "@/shared/ui/kit/button";
import { CheckCheck } from "lucide-react";

type MarkNotificationsAsReadProps = {
  userId: string | undefined;
};

export function MarkNotificationsAsRead({ userId }: MarkNotificationsAsReadProps) {
  const markAsRead = useMarkAllAsRead();

  const handleMarkAllAsRead = () => {
    if (!userId) return;
    markAsRead.mutate({ userId }, { onError: (error) => console.log(error) });
  };

  return (
    <Button disabled={markAsRead.isPending} onClick={handleMarkAllAsRead} className="flex items-center gap-2 disabled:opacity-50">
      <CheckCheck className="w-4 h-4" />
      Отметить как прочитанное
    </Button>
  );
}
