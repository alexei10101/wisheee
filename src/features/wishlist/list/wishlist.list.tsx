import { useNavigate, useParams } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import type { Permissions } from "@/shared/lib/permissions";
import { List } from "@/shared/ui/list";

type WishlistListProps = {
  wishlists: Wishlist[];
  permissions: Permissions;
};

type WishlistDialogState = { operation: "update"; wishlist: Wishlist } | { operation: "delete"; wishlistId: string } | { operation: null };

export const WishlistList = function WishlistList({ wishlists, permissions }: WishlistListProps) {
  const { userId } = useParams<{ userId: string }>();
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  const navigate = useNavigate();
  const onOpen = (id: string) => (userId ? navigate(buildRoutes.userWishlist(userId, id)) : navigate(buildRoutes.myWishlist(id)));

  return (
    <section>
      {wishlists?.length === 0 && <div className="text-lg text-center">Вишлистов пока нет</div>}
      {wishlists && (
        <>
          <List
            items={wishlists}
            getKey={(w) => w.id}
            renderItem={(wishlist) => (
              <WishlistCard
                key={wishlist.id}
                wishlist={wishlist}
                onUpdate={() => setDialog({ operation: "update", wishlist: wishlist })}
                onDelete={() => setDialog({ operation: "delete", wishlistId: wishlist.id })}
                onOpen={onOpen}
                permissions={permissions}
                isMobile={isMobile}
              />
            )}></List>
          {permissions.canUpdate && dialog.operation === "update" && (
            <WishlistUpdateDialog open onClose={() => setDialog({ operation: null })} wishlist={dialog.wishlist} />
          )}
          {permissions.canDelete && dialog.operation === "delete" && (
            <WishlistDeleteDialog open onClose={() => setDialog({ operation: null })} wishlistId={dialog.wishlistId} />
          )}
        </>
      )}
    </section>
  );
};
