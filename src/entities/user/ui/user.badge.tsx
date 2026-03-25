import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import type { User } from "../model/user";
import { cn } from "@/shared/lib/css";
import { getInitials } from "@/shared/utils/get-initials";

const sizeClasses = {
  sm: "w-8 h-8",
  xl: "w-40 h-40",
};

type UserBadgeProps = {
  user: Pick<User, "username" | "avatar_url">;
  variant?: "vertical";
  size?: "sm" | "xl";
};

export function UserBadge({ user, variant, size }: UserBadgeProps) {
  return (
    <Item className={cn(`p-0 ${variant === "vertical" ? "flex-col gap-1" : "gap-2"} `)}>
      <ItemMedia>
        <Avatar className={`${size ? sizeClasses[size] : sizeClasses.sm}`}>
          <AvatarImage
            src={user?.avatar_url || "/default-avatar.png"}
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            className="object-cover"
          />
          <AvatarFallback className="pb-1">{getInitials(user.username)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={`${variant === "vertical" && "text-3xl"}`}>{user?.username}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
