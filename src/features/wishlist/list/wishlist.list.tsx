import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import { useWishlists } from "@/entities/wishlist/model/wishlist.queries";
import { Spinner } from "@/shared/ui/kit/spinner";
import { type Permissions } from "@/shared/lib/permissions";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";

type WishlistListProps = {
  permissions: Permissions;
  userId?: string;
  style?: string;
};

type WishlistDialogState = { operation: "update"; wishlist: Wishlist } | { operation: "delete"; wishlistId: string } | { operation: null };

export const WishlistList = function WishlistList({ permissions, userId, style }: WishlistListProps) {
  const { data: wishlists, isLoading } = useWishlists(userId);
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  const navigate = useNavigate();
  const onOpen = (id: string) => navigate(buildRoutes.wishlist(id));

  return (
    <section className={style}>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && wishlists?.length === 0 && <div className="flex flex-col mx-auto text-lg text-center">Вишлистов пока нет</div>}
      {!isLoading && wishlists && userId && (
        <div className="flex flex-col gap-4">
          {wishlists.map((wishlist) => (
            <WishlistCard
              key={wishlist.id}
              wishlist={wishlist}
              onUpdate={() => setDialog({ operation: "update", wishlist: wishlist })}
              onDelete={() => setDialog({ operation: "delete", wishlistId: wishlist.id })}
              onOpen={onOpen}
              permissions={permissions}
              isMobile={isMobile}
            />
          ))}
          {permissions.canUpdate && dialog.operation === "update" && (
            <WishlistUpdateDialog open onClose={() => setDialog({ operation: null })} wishlist={dialog.wishlist} />
          )}
          {permissions.canDelete && dialog.operation === "delete" && (
            <WishlistDeleteDialog open onClose={() => setDialog({ operation: null })} wishlistId={dialog.wishlistId} />
          )}
        </div>
      )}
    </section>
  );
};
