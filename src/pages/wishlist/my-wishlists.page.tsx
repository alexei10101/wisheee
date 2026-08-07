import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { useMyWishlists } from "@/entities/wishlist/model/wishlist.hooks";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { LocalLoader } from "@/shared/ui/local-loader";
import { PageHeader } from "@/shared/ui/page-header";

function MyWishlistsPage() {
  const me = useRequiredUser();
  const { data: wishlists, isLoading } = useMyWishlists();

  const relation = getUserRelation({ viewerId: me.id, ownerId: me.id });
  const permissions = getPermissions(relation);

  return (
    <main className="page">
      <div className="mb-3 sm:mb-5">
        <PageHeader title="Мои вишлисты" left={<BackButton />} right={permissions.canAdd && <WishlistCreateButton />} />
      </div>
      {isLoading && <LocalLoader />}
      {!isLoading && <WishlistList wishlists={wishlists ?? []} permissions={permissions} />}
    </main>
  );
}

export default MyWishlistsPage;
