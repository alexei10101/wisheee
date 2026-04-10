import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useFriends } from "@/entities/friend/model/friend.queries";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export const FriendList = memo(function () {
  const { data: user } = useCurrentUser();
  const { data: friends, isLoading } = useFriends(user?.id);

  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.Users(userId));

  if (!friends && !isLoading) return <div>У вас еще нет друзей</div>;
  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-62.5" />
        </div>
      ) : (
        friends?.map((user) => <UserCard key={user.id} variant={"default"} user={user} onOpen={onOpen} />)
      )}
    </div>
  );
});
