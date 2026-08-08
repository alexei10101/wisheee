import { useNavigate, useParams } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import type { Permissions } from "@/shared/lib/permissions";
import { List } from "@/shared/ui/list";
import { EmptyState } from "@/shared/ui/empty-state";
import { Heart } from "lucide-react";

type WishlistListProps = {
  wishlists: Wishlist[];
  permissions: Permissions;
};

type WishlistDialogState =
  | { operation: "update"; wishlist: Wishlist }
  | { operation: "delete"; wishlistId: string }
  | { operation: null };

export const WishlistList = function WishlistList({ wishlists, permissions }: WishlistListProps) {
  const { userId } = useParams<{ userId: string }>();
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });

  const navigate = useNavigate();
  const onOpen = (id: string) =>
    userId ? navigate(buildRoutes.userWishlist(userId, id)) : navigate(buildRoutes.myWishlist(id));

  return (
    <section>
      {wishlists?.length === 0 && (
        <EmptyState
          icon={<Heart aria-hidden="true" />}
          title="Вишлистов пока нет"
          description="Создайте первый список и соберите в нём идеи подарков."
        />
      )}
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
              />
            )}
          ></List>
          {permissions.canUpdate && dialog.operation === "update" && (
            <WishlistUpdateDialog
              open
              onClose={() => setDialog({ operation: null })}
              wishlist={dialog.wishlist}
            />
          )}
          {permissions.canDelete && dialog.operation === "delete" && (
            <WishlistDeleteDialog
              open
              onClose={() => setDialog({ operation: null })}
              wishlistId={dialog.wishlistId}
            />
          )}
        </>
      )}
    </section>
  );
};
