import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useFriends } from "@/entities/friend/model/friend.queries";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { PageLoader } from "@/shared/ui/page-loader";
import { toast } from "sonner";
import { List } from "@/shared/ui/list";

export const FriendList = memo(function () {
  const { data: user, isLoading: isCurrentUserLoading } = useCurrentUser();
  const { data: friends, isLoading } = useFriends(user?.id);

  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));

  const handleDeleteFriend = () => toast("Не сегодня :)");

  if (isCurrentUserLoading || isLoading) return <PageLoader />;
  if (!friends) return <div>У вас еще нет друзей</div>;

  return (
    <List
      items={friends}
      getKey={(f) => f.id}
      renderItem={(user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          avatarUrl={user.avatar_url ?? ""}
          onOpen={onOpen}
          onDeleteFriend={handleDeleteFriend}
        />
      )}></List>
  );
});
