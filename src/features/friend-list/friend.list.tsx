import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useFriends } from "@/entities/friend/model/friend.queries";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { PageLoader } from "@/shared/ui/page-loader";

export const FriendList = memo(function () {
  const { data: user } = useCurrentUser();
  const { data: friends, isLoading } = useFriends(user?.id);

  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));

  if (isLoading) return <PageLoader />;
  if (!friends) return <div>У вас еще нет друзей</div>;

  return (
    <div className="flex flex-col gap-2">
      {friends?.map((user) => (
        <UserCard key={user.id} variant={"default"} user={user} onOpen={onOpen} />
      ))}
    </div>
  );
});
