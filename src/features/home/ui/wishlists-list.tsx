import type { Wishlist } from "@/shared/types/wishlist";
import { memo } from "react";
import ItemCard from "./item-card";
import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/model/routes";

type WishlistListProps = {
  wishlists: Wishlist[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (wishlist: Wishlist) => Promise<void>;
};

const WishlistList = ({ wishlists, onDelete, onEdit }: WishlistListProps) => {
  const navigate = useNavigate();
  const onOpen = (id: Wishlist["id"]) => {
    return (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("button")) return;
      navigate(buildRoutes.wishlist(id));
    };
  };
  return (
    <div className="flex flex-col gap-4">
      {wishlists?.map((wishlist) => (
        <ItemCard key={wishlist.id} item={wishlist} onDelete={onDelete} onEdit={onEdit} onOpen={onOpen(wishlist.id)} />
      ))}
    </div>
  );
};

export default memo(WishlistList);
