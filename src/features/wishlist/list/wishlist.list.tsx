import { useNavigate, useParams } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import type { User } from "@/entities/user/model/user";
import type { Permissions } from "@/shared/lib/permissions";
import { useWishlists } from "@/entities/wishlist/model/wishlist.queries";

type WishlistListProps = {
  user: User | undefined;
  permissions: Permissions;
  style?: string;
};

type WishlistDialogState = { operation: "update"; wishlist: Wishlist } | { operation: "delete"; wishlistId: string } | { operation: null };

export const WishlistList = function WishlistList({ permissions, user, style }: WishlistListProps) {
  const { userId } = useParams<{ userId: string }>();
  const { data: wishlists } = useWishlists(user?.id, user?.wishlists);
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });
  const isMobile = !useMediaQuery("(min-width: 640px)");

  const navigate = useNavigate();
  const onOpen = (id: string) => (userId ? navigate(buildRoutes.userWishlist(userId, id)) : navigate(buildRoutes.myWishlist(id)));

  return (
    <section className={style}>
      {wishlists?.length === 0 && <div className="flex flex-col mx-auto text-lg text-center">Вишлистов пока нет</div>}
      {wishlists && (
        <div className="flex flex-col gap-2 sm:gap-4 sm:items-center">
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
