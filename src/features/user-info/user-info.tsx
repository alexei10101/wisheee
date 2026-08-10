import type { User } from "@/entities/user/model/user";
import { Item, ItemContent, ItemMedia } from "@/shared/ui/kit/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";

type UserInfoProps = {
  user: User;
  avatar: string | null;
};

export function UserInfo({ user, avatar }: UserInfoProps) {
  return (
    <Item className="px-0">
      <ItemMedia>
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatar ?? "/default-avatar.webp"} className="object-cover" />
          <AvatarFallback className="flex items-center justify-center text-xl">
            {user.username?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="self-start">
        <p> ★ Wishlist Master Lv.4 </p>
        <p> 18 желаний • 12 исполненных • с нами 2 года </p>
      </ItemContent>
    </Item>
  );
}
