import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import { UserAuth } from "@/app/contexts/auth.context";
import { useWishlists } from "@/entities/wishlist/model/wishlist.queries";

type WishlistListProps = {
  style?: string;
};

type WishlistDialogState = { operation: "update"; wishlist: Wishlist } | { operation: "delete"; wishlistId: string } | { operation: null };

export const WishlistList = function WishlistList({ style }: WishlistListProps) {
  const { user } = UserAuth();
  // TODO
  const { data: wishlists } = useWishlists(user?.id);
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });

  const navigate = useNavigate();
  const onOpen = (id: string) => navigate(buildRoutes.wishlist(id));

  return (
    <section className={style}>
      <div className="flex flex-col gap-4">
        {wishlists?.map((wishlist) => (
          <WishlistCard
            key={wishlist.id}
            wishlist={wishlist}
            onUpdate={() => setDialog({ operation: "update", wishlist: wishlist })}
            onDelete={() => setDialog({ operation: "delete", wishlistId: wishlist.id })}
            onOpen={onOpen}
          />
        ))}

        {dialog.operation === "update" && (
          <WishlistUpdateDialog open onClose={() => setDialog({ operation: null })} wishlist={dialog.wishlist} />
        )}
        {dialog.operation === "delete" && (
          <WishlistDeleteDialog open onClose={() => setDialog({ operation: null })} wishlistId={dialog.wishlistId} />
        )}
      </div>
    </section>
  );
};
