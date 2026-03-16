export type FriendRequest = {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: FriendRequestStatus;
  sender_username: string;
  sender_avatar: string;
  receiver_username: string;
  receiver_avatar: string;
};

export type FriendRequestStatus = "pending" | "accepted" | "rejected";

export type FriendRequestMetadata = Pick<FriendRequest, "sender_username" | "sender_avatar" | "receiver_username" | "receiver_avatar">;
export type FriendNotificationMetadata = FriendRequestMetadata & {
  request_sender_id: string;
};
