import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import type { User } from "../model/user";
import { cn } from "@/shared/lib/css";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useState } from "react";

const sizeClasses = {
  sm: "w-8 h-8",
  lg: "w-30 h-30",
  xl: "w-40 h-40",
};

type UserBadgeProps = {
  user: Pick<User, "username" | "avatar_url">;
  variant?: "vertical"; // default - horizontal badge
  size?: "sm" | "xl" | "lg";
};

export function UserBadge({ user, variant, size = "sm" }: UserBadgeProps) {
  const [loading, setLoading] = useState(true);
  const avatarSize = sizeClasses[size ?? "sm"];

  const avatarUrl = user.avatar_url || "/default-avatar.webp";

  return (
    <Item className={cn(`p-0 ${variant === "vertical" ? "flex-col gap-1" : "inline-flex flex-nowrap w-fit gap-2"}`)}>
      <ItemMedia>
        <Avatar className={avatarSize}>
          {loading && <Skeleton className="absolute inset-0 rounded-full" />}
          <AvatarImage src={avatarUrl} onLoad={() => setLoading(false)} onError={() => setLoading(false)} className="object-cover" />
          <AvatarFallback className="text-xl flex items-center justify-center">
            {user.username?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent className="flex-0">
        <ItemTitle className={cn(size === "lg" && "text-xl sm:text-2xl md:text-3xl", size === "xl" && "text-lg sm:text-3xl md:text-4xl")}>
          {user.username.length < 13 && user.username}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
