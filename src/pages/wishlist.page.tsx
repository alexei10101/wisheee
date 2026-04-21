import { useAuth } from "@/app/auth.context";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { useUser } from "@/entities/user/model/user.queries";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { useWishlist } from "@/entities/wishlist/model/wishlist.queries";
import { WishlistItemCreateButton } from "@/features/wishlist-item/create/wishlist-item-create.button";
import { WishlistItemList } from "@/features/wishlist-item/list/wishlist-item.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";
import { PageLoader } from "@/shared/ui/page-loader";
import { useParams } from "react-router";

function WishlistPage() {
  const { data: me } = useCurrentUser();
  const { session } = useAuth();
  const { userId: paramUserId, id } = useParams<{ userId: string; id: string }>();

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(paramUserId, {
    enabled: !!paramUserId,
  });

  const { data: activeWishlist, isLoading: isWishlistLoading, isError: isWishlistError } = useWishlist(session?.access_token, id);

  const relation = getUserRelation({ viewerId: me?.id, ownerId: paramUserId ?? me?.id });
  const permissions = getPermissions(relation);

  if (isLoading || isWishlistLoading) return <PageLoader />;
  if (isError || isWishlistError) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">Ошибка загрузки страницы</div>;
  if (!activeWishlist) return <div className="pt-25 bg-gray-100 min-h-screen px-4">Вишлист не найден</div>;

  return (
    <main className="pt-25 sm:pt-30 px-2 sm:px-8 min-h-screen bg-gray-100">
      <div className="mb-3 sm:mb-5">
        {paramUserId && user && (
          <PageHeader
            title={activeWishlist.title}
            subtitle={activeWishlist.description}
            left={<BackButton />}
            user={<UserBadge user={{ username: user.username, avatar_url: user.avatar_url }} />}
          />
        )}
        {!paramUserId && (
          <PageHeader
            title={`${activeWishlist.title} ${!activeWishlist.is_public ? "(приватный)" : ""}`}
            subtitle={activeWishlist.description}
            left={<BackButton />}
            right={permissions.canAdd && <WishlistItemCreateButton wishlistId={activeWishlist.id} />}
          />
        )}
      </div>
      <WishlistItemList wishlist={activeWishlist} permissions={permissions} />
    </main>
  );
}

export default WishlistPage;
