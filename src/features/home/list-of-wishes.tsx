import type { Wishlist } from "@/shared/types/wishlist";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import { BookCheck, BookOpenCheck, Pencil, Trash } from "lucide-react";

type ListOfWishesProps = {
  wishlist: Wishlist;
  onDelete: (id: string) => Promise<void>;
  onEdit: (wishlist: Partial<Wishlist>) => Promise<void>;
};

const ListOfWishes = ({ wishlist, onDelete, onEdit }: ListOfWishesProps) => {
  return (
    <Card className="flex flex-row w-full max-w-2xl mx-auto p-6">
      <CardContent className="flex flex-col gap-3 max-w-1/2">
        <CardTitle>{wishlist.title}</CardTitle>
        <CardDescription>{wishlist.description?.trim() || `\u00A0`}</CardDescription>
      </CardContent>
      <CardAction className="ml-auto">
        <Button variant="secondary" className="bg-white hover:bg-neutral-200">
          {wishlist.is_public ? <BookOpenCheck /> : <BookCheck />}
        </Button>
        <Button variant="secondary" className="bg-white hover:bg-neutral-200" onClick={() => onEdit(wishlist)}>
          <Pencil />
        </Button>
        <Button variant="secondary" className="bg-white hover:bg-neutral-200" onClick={() => onDelete(wishlist.id)}>
          <Trash />
        </Button>
      </CardAction>
    </Card>
  );
};

export default ListOfWishes;
