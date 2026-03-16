import { Button } from "@/shared/ui/kit/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/kit/tooltip";
import { BookCheck, BookOpenCheck, Pencil, Trash } from "lucide-react";
import { memo } from "react";
import type { Wishlist } from "../model/wishlist";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";

type WishlistCardProps = {
  wishlist: Wishlist;
  onOpen: (id: string) => void;
  onUpdate: () => void;
  onDelete: () => void;
};

export const WishlistCard = memo(function WishlistCard({ wishlist, onOpen, onUpdate, onDelete }: WishlistCardProps) {
  return (
    <Item
      variant="outline"
      className="w-full max-w-2xl mx-auto cursor-pointer shadow"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button")) return;
        onOpen(wishlist.id);
      }}>
      <ItemContent className="flex flex-col gap-3 max-w-1/2">
        <ItemTitle>{wishlist.title}</ItemTitle>
        <ItemDescription>{wishlist.description?.trim() || `\u00A0`}</ItemDescription>
      </ItemContent>
      <ItemActions className="ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">{wishlist.is_public ? <BookOpenCheck /> : <BookCheck />}</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{wishlist.is_public ? "Публичный" : "Приватный"}</p>
          </TooltipContent>
        </Tooltip>

        <Button variant="ghost" onClick={onUpdate}>
          <Pencil />
        </Button>
        <Button variant="ghost" onClick={onDelete}>
          <Trash />
        </Button>
      </ItemActions>
    </Item>
  );
});
