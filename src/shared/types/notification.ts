export interface Notification {
  id: string; // request id
  event_id: string;
  receiver_id: string; // to whom is the notification
  sender_id: string; // who sent it
  type: NotificationType; // friends_request
  entity_id?: string; // UUID reference
  is_read: boolean;
  metadata?: {
    sender_username: string;
    sender_avatar: string;
  };
  created_at: string;
}

export type NotificationType = "friend_request" | "friend_request_accepted" | "friend_request_rejected";
