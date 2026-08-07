import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { toast } from "sonner";
import { LocalLoader } from "@/shared/ui/local-loader";
import { useMyFriends } from "@/entities/friend/model/friend.hooks";
import { List } from "@/shared/ui/list";

export const FriendList = memo(function () {
  const { data: friends, isLoading } = useMyFriends();
  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));
  const handleDeleteFriend = () => toast("Не сегодня :)");

  if (isLoading) return <LocalLoader />;
  if (!friends?.length) return <div className="text-center text-lg">У вас еще нет друзей</div>;

  return (
    <List
      items={friends}
      getKey={(f) => f.id}
      renderItem={(user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          avatar={user.avatar ?? ""}
          onOpen={onOpen}
          onDeleteFriend={handleDeleteFriend}
        />
      )}
    ></List>
  );
});
