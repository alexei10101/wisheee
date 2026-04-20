import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";
import { WishlistItemCard } from "@/entities/wishlist-item/ui/wishlist-item.card";
import type { WishlistWithItems } from "@/entities/wishlist/model/wishlist";
import { WishlistItemUpdateDialog } from "../update/wishlist-item-update.dialog";
import { WishlistItemDeleteDialog } from "../delete/wishlist-item-delete.dialog";
import { useState } from "react";
import type { Permissions } from "@/shared/lib/permissions";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { useReserveWishlistItem } from "@/entities/wishlist-item/model/wishlist-item.mutations";

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
  const { data: user } = useCurrentUser();
  const reserveWishlistItem = useReserveWishlistItem();
  const [dialog, setDialog] = useState<WishlistItemDialogState>({ operation: null });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  const onOpen = (link: string) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleReserve = (wishlistItemId: string) => {
    try {
      if (!user?.id) return;
      reserveWishlistItem.mutateAsync({ userId: user.id, wishlistItemId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style}>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-2 sm:gap-4 text-lg overflow-x-hidden">
        {wishlist.wishlist_items?.length === 0 && <div className="flex flex-col mx-auto text-lg text-center">Вишлист пуст</div>}
        {wishlist.wishlist_items?.map((item) => (
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
