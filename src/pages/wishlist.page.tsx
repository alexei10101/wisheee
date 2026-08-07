import { useRequiredUser, useUser } from "@/entities/user/model/user.hooks";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { WishlistItemCreateButton } from "@/features/wishlist-item/create/wishlist-item-create.button";
import { WishlistItemList } from "@/features/wishlist-item/list/wishlist-item.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { LocalLoader } from "@/shared/ui/local-loader";
import { PageHeader } from "@/shared/ui/page-header";
import { useParams } from "react-router";

function WishlistPage() {
  const me = useRequiredUser();
  const { userId, wishlistId } = useParams<{ userId: string; wishlistId: string }>();

  const { data: user, isLoading, isError } = useUser(userId);
  // const [wishlists, setWishlists] = useState<Wishlist[]>();

  const { data: activeWishlist, isLoading: isWishlistLoading, isError: isWishlistError } = useWishlistWithItems(id);

  const relation = getUserRelation({ viewerId: me?.id, ownerId: userId ?? me?.id });
  const permissions = getPermissions(relation);

  if (isLoading) return <LocalLoader />;
  if ((!!userId && isError) || isWishlistError)
    return <div className="min-h-screen bg-background px-4 pt-25 text-destructive">Ошибка загрузки страницы</div>;
  if (!activeWishlist) return <div className="min-h-screen bg-background px-4 pt-25">Вишлист не найден</div>;

  return (
    <main className="page bg-background">
      <div className="mb-3 sm:mb-5">
        {userId && user && (
          <PageHeader
            title={activeWishlist.title}
            subtitle={activeWishlist.description}
            left={<BackButton />}
            user={<UserBadge user={{ username: user.username, avatar: user.avatar }} />}
          />
        )}
        {!userId && (
          <PageHeader
            title={`${activeWishlist.title} ${!activeWishlist.isPublic ? "(приватный)" : ""}`}
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
