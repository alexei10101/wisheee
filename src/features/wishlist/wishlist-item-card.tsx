import type { WishlistItem } from "@/shared/types/wishlistItem";
import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";
import { memo } from "react";

type WishlistItemProps = {
  wishlistItem: WishlistItem;
  handleDelete: (id: WishlistItem["id"]) => void;
  handleUpdate: (id: WishlistItem["id"]) => void;
};

const WishlistItemCard = ({ wishlistItem, handleDelete, handleUpdate }: WishlistItemProps) => {
  return (
    <div
      className="rounded-2xl border bg-card shadow-sm p-4 flex gap-4 relative w-100 cursor-pointer"
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("button")) return;
        handleUpdate(wishlistItem.id);
      }}>
      {/* Image */}
      {/* <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
        {wishlistItem.imageUrl ? (
          <img src={imageUrl} alt={wishlistItem.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
        )}
      </div> */}
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-semibold text-base truncate max-w-[90%]">{wishlistItem.title}</h3>

          {wishlistItem.description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{wishlistItem.description}</p>}
        </div>

        {wishlistItem.price !== 0 && (
          <p className="absolute bottom-1 right-5 text-muted-foreground text-[12px]">≈{wishlistItem.price.toLocaleString()} ₽</p>
        )}

        {/* Action */}
        <Button className="absolute top-1 right-1" variant="ghost" onClick={() => handleDelete(wishlistItem.id)}>
          <X />
        </Button>
      </div>
    </div>
  );
};

export default memo(WishlistItemCard);
