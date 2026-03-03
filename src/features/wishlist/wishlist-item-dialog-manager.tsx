import { memo } from "react";
import WishlistItemCreateDialog from "./wishlist-item-create-dialog";
import type { WishlistItem } from "@/shared/types/wishlistItem";
import WishlistItemDeleteDialog from "./wishlist-item-delete-dialog";
import WishlistItemUpdateDialog from "./wishlist-item-update-dialog";

type WishlistItemDialogManagerProps = {
  wishlistId: string;
  open: { isOpen: boolean; operation: "create" | "delete" | "edit" | null };
  resolver: { resolve: (data?: Partial<WishlistItem>) => void; reject: () => void } | null;
  wishlistItem: WishlistItem | null;
};

function WishlistItemDialogManager({ wishlistId, wishlistItem, open, resolver }: WishlistItemDialogManagerProps) {
  return (
    <>
      {open.operation === "create" && <WishlistItemCreateDialog open={open.isOpen} resolver={resolver} wishlistId={wishlistId} />}
      {open.operation === "edit" && wishlistItem && (
        <WishlistItemUpdateDialog open={open.isOpen} resolver={resolver} wishlistItem={wishlistItem} />
      )}
      {open.operation === "delete" && <WishlistItemDeleteDialog open={open.isOpen} resolver={resolver} />}
    </>
  );
}

export default memo(WishlistItemDialogManager);
// export default WishlistItemDialogManager;
