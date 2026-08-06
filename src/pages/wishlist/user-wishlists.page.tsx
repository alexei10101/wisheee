import { PageHeader } from "@/shared/ui/page-header";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { useParams } from "react-router";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { useRequiredUser, useUser } from "@/entities/user/model/user.hooks";
import { LocalLoader } from "@/shared/ui/local-loader";
import { useUserWishlists } from "@/entities/wishlist/model/wishlist.hooks";
import { AppLoader } from "@/shared/ui/app-loader";

function WishlistsPage() {
  const me = useRequiredUser();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading: isUserLoading } = useUser(id);
  const { data: wishlists, isLoading: isWishlistsLoading } = useUserWishlists(user?.id);

  const relation = getUserRelation({ viewerId: me?.id, ownerId: id ?? me?.id });
  const permissions = getPermissions(relation);

  if (isUserLoading) return <AppLoader />;
  if (!user) return <div className="min-h-screen bg-background px-4 pt-25 text-destructive">Ошибка загрузки профиля</div>;
  if (id && !user) return <div className="min-h-screen bg-background px-4 pt-25 text-destructive">Ошибка загрузки профиля</div>;

  return (
    <main className="page">
      <div className="mb-3 sm:mb-5">
        <PageHeader
          title={`Вишлисты пользователя ${user?.username}`}
          left={<BackButton />}
          user={<UserBadge user={{ username: user.username, avatar: user.avatar }} />}
        />
      </div>
      {isWishlistsLoading && <LocalLoader />}
      {!isWishlistsLoading && <WishlistList wishlists={wishlists ?? []} permissions={permissions} />}
    </main>
  );
}

export default WishlistsPage;
