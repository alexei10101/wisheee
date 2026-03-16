export interface AppNotification {
  id: string; // request id
  event_id?: string;
  receiver_id: string; // to whom is the notification
  sender_id: string; // who sent it
  type: AppNotificationType; // friends_request
  entity_id: string; // UUID reference
  is_read: boolean;
  metadata?: {
    request_sender_id: string;
    sender_username?: string;
    sender_avatar?: string;
    receiver_username?: string;
    receiver_avatar?: string;
  };
  created_at: string;
}

export type AppNotificationType = "friend_request" | "friend_request_accepted" | "friend_request_rejected";
