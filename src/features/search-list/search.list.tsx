import type { User } from "@/entities/user/model/user";
import { UserCard } from "@/entities/user/ui/user.card";
import { memo } from "react";

type SearchListProps = {
  list: User[] | null;
  addFriend: (receiverId: string, receiverUsername: string, receiverAvatar: string) => Promise<void>;
};

export const SearchList = memo(function ({ addFriend, list }: SearchListProps) {
  if (!list) return;
  return (
    <>
      {list.length === 0 && <div>По вашему запросу ничего не найдено</div>}
      {list.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {list.map((user) => (
            <UserCard key={user.id} variant={"thin"} user={user} onAddFriend={() => addFriend(user.id, user.username, user.avatar_url)} />
          ))}
        </div>
      )}
    </>
  );
});
