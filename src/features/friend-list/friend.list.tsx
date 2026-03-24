import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useAuth } from "@/entities/user/model/use-auth";
import { useFriends } from "@/entities/friend/model/friend.queries";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";

export const FriendList = memo(function () {
  const { user } = useAuth();
  const { data: friends, isLoading } = useFriends(user?.id);

  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.Users(userId));

  if (!friends && !isLoading) return <div>У вас еще нет друзей</div>;
  return (
    <div className="flex flex-col gap-2">
      {friends?.map((user) => (
        <UserCard key={user.id} variant={"default"} user={user} onOpen={onOpen} />
      ))}
    </div>
  );
});
