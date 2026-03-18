import { memo, useEffect, useState } from "react";
import { cn } from "@/shared/lib/css";
import { friendService } from "@/entities/friend/friend.service";
import { UserCard } from "@/entities/user/ui/user.card";
import type { User } from "@/entities/user/model/user";
import { useAuth } from "@/entities/user/model/use-auth";

type FriendsListProps = {
  cardVariant: "default" | "thin";
  list?: User[];
  addFriend?: (receiverId: string, receiverUsername: string, receiverAvatar: string) => void;
};

export const FriendList = memo(function ({ cardVariant, addFriend, list }: FriendsListProps) {
  const { user } = useAuth();
  const [friends, setFriends] = useState<User[] | null>(list ?? null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user?.friends) return;
    if (list) return setLoading(false);
    const getFriends = async () => {
      const response = await friendService.getFriendsInfo(user.friends);
      if (response.error) return console.log(response.error);
      setFriends(response.result);
    };
    getFriends();
  }, [user]);

  if (!friends && !loading) return <div>У вас еще нет друзей</div>;
  return (
    <div className={cn("flex flex-col", cardVariant === "default" && "gap-2", cardVariant === "thin" && "gap-0.5")}>
      {friends?.map((user) => (
        <UserCard
          key={user.id}
          variant={cardVariant}
          user={user}
          onAddFriend={addFriend ? () => addFriend(user.id, user.username, user.avatarLink) : undefined}
        />
      ))}
    </div>
  );
});
