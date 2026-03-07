import type { Notification } from "@/shared/types/notification";
import { memo } from "react";
import { notificationComponents } from "./notification-registry";
import { Item, ItemContent, ItemMedia } from "@/shared/ui/kit/item";
import { Mail, MailOpen } from "lucide-react";

export type NotificationCardProps = {
  notification: Notification;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
};

const NotificationCard = ({ notification: n, onAccept, onReject }: NotificationCardProps) => {
  const Component = notificationComponents[n.type];
  if (!Component) return null;
  return (
    <Item variant="outline" size="sm" className="bg-white shadow mx-4">
      <ItemMedia className="bg-white" variant="icon">
        {n.is_read ? <MailOpen /> : <Mail />}
      </ItemMedia>

      <ItemContent>
        <Component notification={n} onAccept={onAccept} onReject={onReject} />
      </ItemContent>
    </Item>
  );
};

export default memo(NotificationCard);
