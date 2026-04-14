import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import { Plus, X } from "lucide-react";
import { memo } from "react";
import type { User } from "../model/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Skeleton } from "@/shared/ui/kit/skeleton";

type UserCardProps = {
  variant: "default" | "thin";
  user: User;
  onOpen: (userId: string) => void;
  onAddFriend?: () => Promise<void> | undefined;
};

export const UserCard = memo(function ({ variant, user, onOpen, onAddFriend }: UserCardProps) {
  return (
    <Item
      variant="outline"
      key={user.id}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button")) return;
        onOpen(user.id);
      }}
      className={cn(
        "relative flex flex-row w-full mx-auto cursor-pointer group bg-white shadow",
        variant === "default" && "max-w-2xl py-6",
        variant === "thin" && "py-1 px-3 rounded-md",
      )}>
      <ItemMedia>
        <Avatar className="size-7">
          <AvatarImage src={user.avatar_url} onError={(e) => (e.currentTarget.src = "/default-avatar.webp")} className="object-cover" />
          <AvatarFallback>
            <Skeleton className={`pb-1 w-7 h-7 rounded-full`} />
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className={cn("flex-row gap-3 max-w-1/2", variant === "thin" && "p-0")}>
        <ItemTitle className={cn(variant === "thin" && "leading-6.5")}>{user.username}</ItemTitle>
        <ItemDescription hidden={true}></ItemDescription>
      </ItemContent>
      <ItemActions className="ml-auto sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {variant === "default" && (
          <div>
            <Button className="absolute right-2 -translate-y-4" variant="ghost">
              <X />
            </Button>
          </div>
        )}
        {variant === "thin" && (
          <Button
            size="sm"
            className="absolute right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            variant="ghost"
            onClick={onAddFriend}>
            <Plus />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
});
