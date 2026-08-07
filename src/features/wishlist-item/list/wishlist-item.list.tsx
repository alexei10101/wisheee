import type { WishlistItem } from "@/entities/wishlist-item/model/item";
import { WishlistItemCard } from "@/entities/wishlist-item/ui/wishlist-item.card";
import { WishlistItemUpdateDialog } from "../update/wishlist-item-update.dialog";
import { WishlistItemDeleteDialog } from "../delete/wishlist-item-delete.dialog";
import { useState } from "react";
import type { Permissions } from "@/shared/lib/permissions";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { List } from "@/shared/ui/list";

type WishlistItemList = {
  permissions: Permissions;
  items: WishlistItem[];
  style?: string;
};

type WishlistItemDialogState =
  | { operation: "update"; wishlistItem: WishlistItem }
  | { operation: "delete"; wishlistItemId: string }
  | { operation: null };

export function WishlistItemList({ permissions, items, style }: WishlistItemList) {
  const [dialog, setDialog] = useState<WishlistItemDialogState>({ operation: null });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  const onOpen = (link: string) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleReserve = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style}>
      {items.length === 0 && <div className="text-lg text-center">Вишлист пуст</div>}
      <List
        items={items}
        getKey={(i) => i.id}
        renderItem={(item) => (
          <WishlistItemCard
            key={item.id}
            wishlistItem={item}
            permissions={permissions}
            handleDelete={permissions.canDelete ? () => setDialog({ operation: "delete", wishlistItemId: item.id }) : undefined}
            handleUpdate={permissions.canUpdate ? () => setDialog({ operation: "update", wishlistItem: item }) : undefined}
            handleReserve={permissions.canReserve ? handleReserve : undefined}
            isMobile={isMobile}
            onOpen={onOpen}
          />
        )}></List>

      {dialog.operation === "update" && (
        <WishlistItemUpdateDialog open onClose={() => setDialog({ operation: null })} wishlistItem={dialog.wishlistItem} />
      )}
      {dialog.operation === "delete" && (
        <WishlistItemDeleteDialog open onClose={() => setDialog({ operation: null })} wishlistItemId={dialog.wishlistItemId} />
      )}
    </section>
  );
}
