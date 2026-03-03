import type { WishlistItem } from "@/shared/types/wishlistItem";
import { memo } from "react";
import WishlistItemCard from "./wishlist-item-card";

type WishlistItemsListProps = {
  wishlistItems: WishlistItem[];
  handleDelete: (id: WishlistItem["id"]) => void;
  handleUpdate: (id: WishlistItem["id"]) => void;
};

const WishlistItemsList = ({ wishlistItems, handleDelete, handleUpdate }: WishlistItemsListProps) => {
  return (
    <>
      {wishlistItems.map((item) => (
        <WishlistItemCard key={item.id} wishlistItem={item} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      ))}
    </>
  );
};

export default memo(WishlistItemsList);
