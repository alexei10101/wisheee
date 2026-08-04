import { memo } from "react";
import { UserCard } from "@/entities/user/ui/user.card";
import { useFriends } from "@/entities/friend/model/friend.queries";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { toast } from "sonner";
import { LocalLoader } from "@/shared/ui/local-loader";
import { useRequiredUser } from "@/entities/user/model/user.hooks";

export const FriendList = memo(function () {
  const user = useRequiredUser();
  const { data: friends, isLoading } = useFriends(user?.id);
  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));
  const handleDeleteFriend = () => toast("Не сегодня :)");
  if (isLoading) return <LocalLoader />;
  if (!friends) return <div>У вас еще нет друзей</div>;
  return (
    <div className="flex flex-col gap-2">
      {friends?.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          avatar={user.avatar ?? ""}
          onOpen={onOpen}
          onDeleteFriend={handleDeleteFriend}
        />
      ))}
    </div>
  );
});
