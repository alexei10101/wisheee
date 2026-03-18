import { useNavigate } from "react-router";
import { buildRoutes } from "@/shared/routes";
import { useState } from "react";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import { WishlistCard } from "@/entities/wishlist/ui/wishlist.card";
import { WishlistUpdateDialog } from "../update/wishlist-update.dialog";
import { WishlistDeleteDialog } from "../delete/wishlist-delete.dialog";
import { useWishlists } from "@/entities/wishlist/model/wishlist.queries";
import { useAuth } from "@/entities/user/model/use-auth";
import { Spinner } from "@/shared/ui/kit/spinner";

type WishlistListProps = {
  style?: string;
};

type WishlistDialogState = { operation: "update"; wishlist: Wishlist } | { operation: "delete"; wishlistId: string } | { operation: null };

export const WishlistList = function WishlistList({ style }: WishlistListProps) {
  const { user } = useAuth();
  const { data: wishlists, isLoading } = useWishlists(user?.id);
  const [dialog, setDialog] = useState<WishlistDialogState>({ operation: null });

  const navigate = useNavigate();
  const onOpen = (id: string) => navigate(buildRoutes.wishlist(id));

  return (
    <section className={style}>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (!wishlists || wishlists?.length === 0) && (
        <div className="flex flex-col mx-auto text-lg text-center">Вишлистов пока нет</div>
      )}
      {!isLoading && wishlists && (
        <div className="flex flex-col gap-4">
          {wishlists.map((wishlist) => (
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
      )}
    </section>
  );
};
