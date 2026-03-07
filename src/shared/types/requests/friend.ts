export type FriendRequest = {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: FriendRequestStatus;
};

export type FriendRequestStatus = "pending" | "accepted" | "rejected";
