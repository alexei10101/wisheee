import { PageHeader } from "@/shared/ui/page-header";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { useAuth } from "@/entities/user/model/use-auth";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";

function WishlistsPage() {
  const { user } = useAuth();

  const relation = getUserRelation({ viewerId: user?.id, ownerId: user?.id });
  const permissions = getPermissions(relation);

  return (
    <main className="pt-25 sm:pt-30 px-2 sm:px-8">
      <div className="mb-3 sm:mb-5">
        <PageHeader title="Мои вишлисты" left={<BackButton />} right={permissions.canAdd && <WishlistCreateButton />} />
      </div>
      <WishlistList userId={user?.id} permissions={permissions} />
    </main>
  );
}

export default WishlistsPage;
