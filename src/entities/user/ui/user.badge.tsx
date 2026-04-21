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
  variant?: "vertical";
  size?: "sm" | "xl" | "lg";
};

export function UserBadge({ user, variant, size }: UserBadgeProps) {
  const avatarSize = sizeClasses[size ?? "sm"];
  const [loading, setLoading] = useState(true);

  return (
    <Item className={cn(`p-0 ${variant === "vertical" ? "flex-col gap-1" : "gap-2"} inline-flex flex-nowrap w-fit`)}>
      <ItemMedia>
        <Avatar className={avatarSize}>
          {loading && <Skeleton className="absolute inset-0 rounded-full" />}

          <AvatarImage
            src={user.avatar_url ?? "/default-avatar.webp"}
            className="object-cover"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />

          <AvatarFallback>{user.username.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent className="flex-0">
        <ItemTitle className={cn(size === "lg" && "text-base sm:text-2xl md:text-3xl", size === "xl" && "text-lg sm:text-3xl md:text-4xl")}>
          {user?.username}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
