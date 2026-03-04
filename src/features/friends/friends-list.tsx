import type { Profile } from "@/shared/types/profile";
import { memo } from "react";
import UserCard from "./user-card";
import { cn } from "@/shared/lib/css";

type FriendsListProps = {
  cardVariant: "default" | "thin";
  list: Profile[];
};

const FriendsList = ({ cardVariant, list }: FriendsListProps) => {
  return (
    <div className={cn("flex flex-col", cardVariant === "default" && "gap-2", cardVariant === "thin" && "gap-0.5")}>
      {list.map((user) => (
        <UserCard key={user.id} variant={cardVariant} user={user} />
      ))}
    </div>
  );
};

export default memo(FriendsList);
