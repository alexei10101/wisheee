import { useAuth } from "@/entities/user/model/use-auth";
import { useUser } from "@/entities/user/model/user.queries";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { Spinner } from "@/shared/ui/kit/spinner";
import { PageHeader } from "@/shared/ui/page-header";
import { useParams } from "react-router";

function UsersPage() {
  const { user: hero } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading, isError } = useUser(userId);

  const relation = getUserRelation({ viewerId: userId, ownerId: hero?.id });
  const permissions = getPermissions(relation);

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  if (isError) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">Ошибка загрузки профиля</div>;

  return (
    <main className="bg-gray-100 min-h-screen px-2 sm:px-8 pt-25 sm:pt-30">
      <div className="mb-3 sm:mb-5">
        <PageHeader
          title={`Вишлисты пользователя ${user?.username}`}
          left={<BackButton />}
          // right - add to frined or friend yet
          // right={<WishlistItemCreateButton wishlistId={activeWishlist.id} />}
          user={<UserBadge user={{ username: user?.username ?? "", avatar_url: user?.avatar_url ?? "" }} />}
        />
      </div>
      {userId && <WishlistList userId={userId} permissions={permissions} />}
    </main>
  );
}

export default UsersPage;
