import type { User } from "@/entities/user/model/user";
import { UserCard } from "@/entities/user/ui/user.card";
import { buildRoutes } from "@/shared/routes";
import { memo } from "react";
import { useNavigate } from "react-router";

type SearchListProps = {
  list: (User & { isFriend: boolean })[] | null;
  addFriend: (receiverId: string, receiverUsername: string, receiverAvatar: string) => Promise<void>;
};

export const SearchList = memo(function ({ addFriend, list }: SearchListProps) {
  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));

  if (!list) return;

  return (
    <>
      {list.length === 0 && <div>По вашему запросу ничего не найдено</div>}
      {list.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {list.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              avatarUrl={user.avatar_url}
              onOpen={onOpen}
              isFriend={user.isFriend}
              onAddFriend={addFriend}
            />
          ))}
        </div>
      )}
    </>
  );
});
