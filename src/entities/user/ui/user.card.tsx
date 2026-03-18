import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import { Plus, X } from "lucide-react";
import { memo } from "react";
import type { User } from "../model/user";

type UserCardProps = {
  variant: "default" | "thin";
  user: User;
  onAddFriend?: () => void | undefined;
};

export const UserCard = memo(function ({ variant, user, onAddFriend }: UserCardProps) {
  return (
    <Item
      variant="outline"
      key={user.id}
      className={cn(
        "relative flex flex-row w-full mx-auto cursor-pointer group bg-white shadow",
        variant === "default" && "max-w-2xl py-6",
        variant === "thin" && "py-1 px-3 rounded-md",
      )}>
      <ItemContent className={cn("flex flex-col gap-3 max-w-1/2", variant === "thin" && "p-0")}>
        <ItemTitle className={cn(variant === "thin" && "leading-6.5")}>{user.username}</ItemTitle>
        <ItemDescription hidden={true}></ItemDescription>
      </ItemContent>
      <ItemActions className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        {variant === "default" && (
          <div>
            <Button className="absolute right-2 -translate-y-4" variant="ghost">
              <X />
            </Button>
          </div>
        )}
        {variant === "thin" && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="absolute right-2 -translate-y-4" variant="ghost" onClick={onAddFriend}>
              <Plus />
            </Button>
          </div>
        )}
      </ItemActions>
    </Item>
  );
});
