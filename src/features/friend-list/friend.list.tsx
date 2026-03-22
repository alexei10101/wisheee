import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useAuth } from "@/entities/user/model/use-auth";
import { useFriends } from "@/entities/friend/model/friend.queries";

export const FriendList = memo(function () {
  const { user } = useAuth();
  const { data: friends, isLoading } = useFriends(user?.id);

  if (!friends && !isLoading) return <div>У вас еще нет друзей</div>;
  return (
    <div className="flex flex-col gap-2">
      {friends?.map((user) => (
        <UserCard key={user.id} variant={"default"} user={user} />
      ))}
    </div>
  );
});
