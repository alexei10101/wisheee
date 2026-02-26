import type { Wishlist } from "@/shared/types/wishlist";
import { memo } from "react";
import WishlistCreateDialog from "../wishlist-create-dialog";
import WishlistDeleteDialog from "../wishlist-delete-dialog";
import WishlistEditDialog from "../wishlist-edit-dialog";

type WishlistDialogManagerProps = {
  open: { isOpen: boolean; operation: "create" | "delete" | "edit" | null };
  resolver: { resolve: (data: boolean | Partial<Wishlist>) => void; reject: () => void } | null;
  data: Partial<Wishlist> | null;
};

function WishlistDialogManager({ open, resolver, data }: WishlistDialogManagerProps) {
  return (
    <>
      {open.operation === "create" && <WishlistCreateDialog open={open.isOpen} resolver={resolver} />}
      {open.operation === "edit" && <WishlistEditDialog open={open.isOpen} resolver={resolver} data={data} />}
      {open.operation === "delete" && <WishlistDeleteDialog open={open.isOpen} resolver={resolver} />}
    </>
  );
}

export default memo(WishlistDialogManager);
