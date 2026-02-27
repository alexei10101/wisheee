import type { Wishlist } from "@/shared/types/wishlist";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/kit/tooltip";
import { BookCheck, BookOpenCheck, Pencil, Trash } from "lucide-react";
import { memo } from "react";

type ItemCardProps = {
  item: Wishlist;
  onDelete: (id: string) => Promise<void>;
  onEdit: (wishlist: Wishlist) => Promise<void>;
  onOpen: (e: React.MouseEvent) => void;
};

const ItemCard = ({ item, onEdit, onDelete, onOpen }: ItemCardProps) => {
  return (
    <Card className="flex flex-row w-full max-w-2xl mx-auto p-6 cursor-pointer" onClick={onOpen}>
      <CardContent className="flex flex-col gap-3 max-w-1/2">
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description?.trim() || `\u00A0`}</CardDescription>
      </CardContent>
      <CardAction className="ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="bg-white hover:bg-neutral-200">
              {item.is_public ? <BookOpenCheck /> : <BookCheck />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.is_public ? "Публичный" : "Приватный"}</p>
          </TooltipContent>
        </Tooltip>

        <Button variant="secondary" className="bg-white hover:bg-neutral-200" onClick={() => onEdit(item)}>
          <Pencil />
        </Button>
        <Button variant="secondary" className="bg-white hover:bg-neutral-200" onClick={() => onDelete(item.id)}>
          <Trash />
        </Button>
      </CardAction>
    </Card>
  );
};

export default memo(ItemCard);
