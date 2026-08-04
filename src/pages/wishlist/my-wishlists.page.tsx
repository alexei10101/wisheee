import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { useWishlists } from "@/entities/wishlist/model/wishlist.hooks";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { AppLoader } from "@/shared/ui/app-loader";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";

function MyWishlistsPage() {
  const me = useRequiredUser();
  const { data: wishlists, isLoading } = useWishlists();

  const relation = getUserRelation({ viewerId: me.id, ownerId: me.id });
  const permissions = getPermissions(relation);

  if (isLoading) return <AppLoader />;
  return (
    <main className="pt-25 pb-4 sm:pt-30 px-2 sm:px-8">
      <div className="mb-3 sm:mb-5">
        <PageHeader title="Мои вишлисты" left={<BackButton />} right={permissions.canAdd && <WishlistCreateButton />} />
      </div>
      <WishlistList wishlists={wishlists ?? []} permissions={permissions} />
    </main>
  )
}

export default MyWishlistsPage;
