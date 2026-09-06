import type { User } from "@/entities/user/model/user";

export type FriendRequest = {
  id: string;
  sender: User;
  addressee: User;
  createdAt: Date;
};

// export type FriendRequestStatus = "pending" | "accepted" | "rejected";

// export type FriendRequestMetadata = Pick<
//   FriendRequest,
//   "sender_username" | "sender_avatar" | "receiver_username" | "receiver_avatar"
// >;
// export type FriendNotificationMetadata = FriendRequestMetadata & {
//   request_sender_id: string;
// };
