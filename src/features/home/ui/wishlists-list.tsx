import type { Wishlist } from "@/shared/types/wishlist";
import { memo } from "react";
import ItemCard from "../item-card";

type WishlistListProps = {
  wishlists: Wishlist[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (wishlist: Wishlist) => Promise<void>;
};

const WishlistList = ({ wishlists, onDelete, onEdit }: WishlistListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {wishlists?.map((wishlist) => (
        <ItemCard key={wishlist.id} item={wishlist} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default memo(WishlistList);
