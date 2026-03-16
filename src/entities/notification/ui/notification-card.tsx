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
};

const NotificationCard = ({ userId, notification: n, onAccept, onReject }: NotificationCardProps) => {
  const Component = notificationComponents[n.type];
  if (!Component) return null;
  return (
    <Item variant="outline" size="sm" className="bg-white shadow">
      <ItemMedia className="bg-white" variant="icon">
        {n.is_read ? <MailOpen /> : <Mail />}
      </ItemMedia>

      <ItemContent className={n.type}>
        <Component userId={userId} notification={n} onAccept={onAccept} onReject={onReject} />
      </ItemContent>
    </Item>
  );
};

export default memo(NotificationCard);
