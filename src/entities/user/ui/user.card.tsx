import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";
import { memo } from "react";
import { UserBadge } from "./user.badge";
import { AddFriendBtn } from "@/features/friend/add/friend-add.button";

type UserCardProps = {
  id: string;
  username: string;
  avatar: string;
  onOpen: (userId: string) => void;
  isFriend: boolean;
  onAddFriend?: (addresseeId: string) => Promise<void>;
  onDeleteFriend?: () => void;
};

export const UserCard = memo(function UserCard({
  id,
  username,
  avatar,
  onOpen,
  isFriend,
  onAddFriend,
  onDeleteFriend,
}: UserCardProps) {
  return (
    <article className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-md motion-reduce:transition-none sm:p-3">
      <button
        type="button"
        aria-label={`Открыть профиль ${username}`}
        className="min-w-0 flex-1 rounded-xl p-1 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        onClick={() => onOpen(id)}
      >
        <UserBadge user={{ avatar, username }} />
      </button>

      <div className="flex shrink-0 items-center gap-1">
        {onDeleteFriend && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={`Удалить ${username} из друзей`}
            onClick={onDeleteFriend}
          >
            <X aria-hidden="true" />
          </Button>
        )}
        {onAddFriend && (
          <AddFriendBtn
            isFriend={isFriend}
            username={username}
            onAddFriend={() => onAddFriend(id)}
          />
        )}
      </div>
    </article>
  );
});
