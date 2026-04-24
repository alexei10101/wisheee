import { PageHeader } from "@/shared/ui/page-header";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { useParams } from "react-router";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { useUser } from "@/entities/user/model/user.queries";
import { PageLoader } from "@/shared/ui/page-loader";

function WishlistsPage() {
  const { data: me } = useCurrentUser();
  const { userId: paramUserId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(paramUserId, {
    enabled: !!paramUserId,
  });

  const relation = getUserRelation({ viewerId: me?.id, ownerId: paramUserId ?? me?.id });
  const permissions = getPermissions(relation);

  if (isLoading) return <PageLoader />;
  if (paramUserId && (isError || !user))
    return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">Ошибка загрузки профиля</div>;

  return (
    <main className="pt-25 pb-4 sm:pt-30 px-2 sm:px-8">
      <div className="mb-3 sm:mb-5">
        {paramUserId && user && (
          <PageHeader
            title={`Вишлисты пользователя ${user?.username}`}
            left={<BackButton />}
            user={<UserBadge user={{ username: user.username, avatar_url: user.avatar_url }} />}
          />
        )}
        {!paramUserId && <PageHeader title="Мои вишлисты" left={<BackButton />} right={permissions.canAdd && <WishlistCreateButton />} />}
      </div>
      <WishlistList user={user ?? me} permissions={permissions} />
    </main>
  );
}

export default WishlistsPage;
