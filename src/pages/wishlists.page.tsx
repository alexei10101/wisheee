import { PageHeader } from "@/shared/ui/page-header";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { useAuth } from "@/entities/user/model/use-auth";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";

function WishlistsPage() {
  const { user } = useAuth();

  const relation = getUserRelation({ viewerId: user?.id, ownerId: user?.id });
  const permissions = getPermissions(relation);

  return (
    <main>
      <PageHeader style={"pt-30 px-8"} title="Мои вишлисты" right={<WishlistCreateButton />} />
      <WishlistList userId={user?.id} permissions={permissions} />
    </main>
  );
}

export default WishlistsPage;
