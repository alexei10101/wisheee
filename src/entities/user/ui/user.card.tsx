import { Button } from "@/shared/ui/kit/button";
import { Item, ItemActions, ItemContent } from "@/shared/ui/kit/item";
import { Plus, X } from "lucide-react";
import { memo } from "react";
import { UserBadge } from "./user.badge";

type UserCardProps = {
  id: string;
  username: string;
  avatarUrl: string;
  onOpen: (userId: string) => void;
  onAddFriend?: (receiverId: string, receiverUsername: string, receiverAvatar: string) => Promise<void>;
  onDeleteFriend?: () => void;
};

export const UserCard = memo(function ({ id, username, avatarUrl, onOpen, onAddFriend, onDeleteFriend }: UserCardProps) {
  return (
    <Item
      className="relative p-2 sm:p-4 flex flex-row w-full mx-auto cursor-pointer group bg-white shadow"
      variant="outline"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button")) return;
        onOpen(id);
      }}>
      <ItemContent className="flex-row gap-3 max-w-1/2">
        <UserBadge user={{ avatar_url: avatarUrl, username }} />
      </ItemContent>
      <ItemActions className="absolute right-2 top-2.5 sm:top-4.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {onDeleteFriend && (
          <Button size="sm" variant="ghost" onClick={() => onDeleteFriend()}>
            <X />
          </Button>
        )}
        {onAddFriend && (
          <Button size="sm" variant="ghost" onClick={() => onAddFriend(id, username, avatarUrl)}>
            <Plus />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
});
