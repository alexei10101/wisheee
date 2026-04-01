import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import type { User } from "../model/user";
import { cn } from "@/shared/lib/css";
import { getInitials } from "@/shared/utils/get-initials";

const sizeClasses = {
  sm: "w-8 h-8",
  lg: "w-30 h-30",
  xl: "w-40 h-40",
};

type UserBadgeProps = {
  user: Pick<User, "username" | "avatar_url">;
  variant?: "vertical";
  size?: "sm" | "xl" | "lg";
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
          <AvatarFallback
            className={cn(
              "pb-1",
              size === "lg" && "text-base sm:text-2xl md:text-3xl",
              size === "xl" && "text-lg sm:text-3xl md:text-4xl",
            )}>
            {getInitials(user.username)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={cn(size === "lg" && "text-base sm:text-2xl md:text-3xl", size === "xl" && "text-lg sm:text-3xl md:text-4xl")}>
          {user?.username.length < 13 && user?.username}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
