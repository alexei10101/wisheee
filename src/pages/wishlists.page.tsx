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
    <main className="pt-30 px-8">
      <PageHeader style={"mb-5"} title="Мои вишлисты" left={<BackButton />} right={permissions.canAdd && <WishlistCreateButton />} />
      <WishlistList userId={user?.id} permissions={permissions} />
    </main>
  );
}

export default WishlistsPage;
