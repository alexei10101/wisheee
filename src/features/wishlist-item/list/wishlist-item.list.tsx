import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";
import { WishlistItemCard } from "@/entities/wishlist-item/ui/wishlist-item.card";
import type { WishlistWithItems } from "@/entities/wishlist/model/wishlist";
import WishlistItemUpdateDialog from "../update/wishlist-item-update.dialog";
import { WishlistItemDeleteDialog } from "../delete/wishlist-item-delete.dialog";
import { useState } from "react";
import type { Permissions } from "@/shared/lib/permissions";

type WishlistItemList = {
  permissions: Permissions;
  wishlist: WishlistWithItems;
  style?: string;
};

type WishlistItemDialogState =
  | { operation: "update"; wishlistItem: WishlistItem }
  | { operation: "delete"; wishlistItemId: string }
  | { operation: null };

export function WishlistItemList({ permissions, wishlist, style }: WishlistItemList) {
  const [dialog, setDialog] = useState<WishlistItemDialogState>({ operation: null });

  return (
    <section className={style}>
      <div className="flex flex-wrap gap-5 text-lg">
        {wishlist.wishlist_items?.length === 0 && <div className="flex flex-col mx-auto text-lg text-center">Вишлист пуст</div>}
        {wishlist.wishlist_items?.map((item) => (
          <WishlistItemCard
            key={item.id}
            wishlistItem={item}
            permissions={permissions}
            handleDelete={permissions.canDelete ? () => setDialog({ operation: "delete", wishlistItemId: item.id }) : undefined}
            handleUpdate={permissions.canUpdate ? () => setDialog({ operation: "update", wishlistItem: item }) : undefined}
          />
        ))}
      </div>

      {dialog.operation === "update" && (
        <WishlistItemUpdateDialog open onClose={() => setDialog({ operation: null })} wishlistItem={dialog.wishlistItem} />
      )}
      {dialog.operation === "delete" && (
        <WishlistItemDeleteDialog
          wishlistId={wishlist.id}
          open
          onClose={() => setDialog({ operation: null })}
          wishlistItemId={dialog.wishlistItemId}
        />
      )}
    </section>
  );
}
