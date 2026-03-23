import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import type { User } from "../model/user";

type UserBadgeProps = {
  user: Pick<User, "username" | "avatar_url">;
  size?: number;
};

export function UserBadge({ user, size }: UserBadgeProps) {
  return (
    <Item className="p-0 gap-2">
      <ItemMedia>
        <Avatar className={`size-${(size = 8)}`}>
          <AvatarImage src={user?.avatar_url || "/default-avatar.png"} className="object-cover" />
          <AvatarFallback className="pb-1">{(user?.username?.at(0) ?? "") + (user?.username?.at(1) ?? "")}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user?.username}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
