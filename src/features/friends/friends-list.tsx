import type { Profile } from "@/shared/types/profile";
import { memo } from "react";
import UserCard from "./user-card";
import { cn } from "@/shared/lib/css";

type FriendsListProps = {
  cardVariant: "default" | "thin";
  list: Profile[];
  addFriend?: (receiverId: Profile["id"]) => void;
};

const FriendsList = ({ cardVariant, list, addFriend }: FriendsListProps) => {
  if (cardVariant === "thin" && !addFriend) return;
  return (
    <div className={cn("flex flex-col", cardVariant === "default" && "gap-2", cardVariant === "thin" && "gap-0.5")}>
      {list.map((user) => (
        <UserCard key={user.id} variant={cardVariant} user={user} onAddFriend={addFriend ? () => addFriend(user.id) : undefined} />
      ))}
    </div>
  );
};

export default memo(FriendsList);
