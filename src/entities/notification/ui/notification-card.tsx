import type { AppNotification } from "@/entities/notification/model/notification";
import { memo } from "react";
import { Item, ItemContent, ItemMedia } from "@/shared/ui/kit/item";
import { Mail, MailOpen } from "lucide-react";
import { notificationComponents } from "../model/notification-registry";

export type NotificationCardProps = {
  userId: string;
  notification: AppNotification;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
  onDelete: () => Promise<void>;
  onOpen: (userId: string) => void | Promise<void>;
};

export const NotificationCard = memo(function NotificationCard({
  userId,
  notification: n,
  onAccept,
  onReject,
  onOpen,
}: NotificationCardProps) {
  const Component = notificationComponents[n.type];
  if (!Component) return null;
  return (
    <Item
      variant="outline"
      size="sm"
      className="w-full rounded-2xl border-border/70 bg-card p-3 shadow-sm sm:p-4"
    >
      <ItemMedia className="rounded-xl bg-primary/10 text-primary" variant="icon">
        {n.readAt ? <MailOpen /> : <Mail />}
        <span className="sr-only">{n.readAt ? "Прочитано" : "Новое уведомление"}</span>
      </ItemMedia>

      <ItemContent className={n.type}>
        <Component
          userId={userId}
          notification={n}
          onAccept={onAccept}
          onReject={onReject}
          onDelete={async () => {}}
          onOpen={onOpen}
        />
      </ItemContent>
    </Item>
  );
});
