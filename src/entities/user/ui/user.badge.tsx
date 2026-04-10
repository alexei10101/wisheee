import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import type { User } from "../model/user";
import { cn } from "@/shared/lib/css";
import { Skeleton } from "@/shared/ui/kit/skeleton";

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
  if (!user.username) console.log("no user");
  return (
    <Item className={cn(`p-0 ${variant === "vertical" ? "flex-col gap-1" : "gap-2"} `)}>
      <ItemMedia>
        <Avatar className={`${size ? sizeClasses[size] : sizeClasses.sm}`}>
          <AvatarImage src={user.avatar_url} onError={(e) => (e.currentTarget.src = "/default-avatar.webp")} className="object-cover" />
          <AvatarFallback>
            <Skeleton className={`${size ? sizeClasses[size] : sizeClasses.sm} rounded-full`} />
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
