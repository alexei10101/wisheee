import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { useWishlistItems } from "@/entities/wishlist-item/model/item.hooks";
import { useUserWishlist } from "@/entities/wishlist/model/wishlist.hooks";
import { WishlistItemList } from "@/features/wishlist-item/list/wishlist-item.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { LocalLoader } from "@/shared/ui/local-loader";
import { PageHeader } from "@/shared/ui/page-header";
import { useParams } from "react-router";

function UserWishlistPage() {
  const me = useRequiredUser();
  const { userId, wishlistId } = useParams<{ userId: string; wishlistId: string }>();

  const wishlistQuery = useUserWishlist(userId, wishlistId);
  const itemsQuery = useWishlistItems(wishlistId);

  const wishlist = wishlistQuery.data;
  const items = itemsQuery.data ?? [];
  const isLoading = wishlistQuery.isLoading || itemsQuery.isLoading;
  const isError = wishlistQuery.isError || itemsQuery.isError;

  const relation = getUserRelation({ viewerId: me.id, ownerId: userId });
  const permissions = getPermissions(relation);

  // TODO add error handler

  if (!wishlist || isError)
    return <div className="min-h-screen bg-background px-4 pt-25">Вишлист не найден</div>;
  return (
    <main className="page">
      <div className="page-content">
        <div className="mb-6 sm:mb-8">
          <PageHeader
            title={wishlist.title}
            subtitle={wishlist.description}
            left={<BackButton />}
          />
        </div>
        {isLoading && <LocalLoader />}
        {!isLoading && <WishlistItemList items={items} permissions={permissions} />}
      </div>
    </main>
  );
}

export default UserWishlistPage;
