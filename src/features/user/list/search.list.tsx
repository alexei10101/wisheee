import type { User } from "@/entities/user/model/user";
import { UserCard } from "@/entities/user/ui/user.card";
import { buildRoutes } from "@/shared/routes";
import { List } from "@/shared/ui/list";
import { memo } from "react";
import { useNavigate } from "react-router";

type SearchListProps = {
  users: User[] | null;
  addFriend: (
    receiverId: string,
    receiverUsername: string,
    receiverAvatar: string,
  ) => Promise<void>;
};

export const SearchList = memo(function ({ addFriend, users }: SearchListProps) {
  const navigate = useNavigate();
  const onOpen = (userId: string) => navigate(buildRoutes.userWishlists(userId));

  if (!users) return;

  return (
    <>
      {users.length === 0 && <div>По вашему запросу ничего не найдено</div>}
      {users.length > 0 && (
        <List
          items={users}
          getKey={(u) => u.id}
          renderItem={(user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              avatar={user.avatar ?? ""}
              onOpen={onOpen}
              onAddFriend={addFriend}
            />
          )}
        ></List>
      )}
    </>
  );
});
