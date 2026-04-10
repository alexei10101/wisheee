import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { useWishlist } from "@/entities/wishlist/model/wishlist.queries";
import { WishlistItemCreateButton } from "@/features/wishlist-item/create/wishlist-item-create.button";
import { WishlistItemList } from "@/features/wishlist-item/list/wishlist-item.list";
import { getPermissions, getUserRelation } from "@/shared/lib/permissions";
import { BackButton } from "@/shared/ui/back.button";
import { PageHeader } from "@/shared/ui/page-header";
import { useParams } from "react-router";

function WishlistPage() {
  const { data: user } = useCurrentUser();
  const { id } = useParams<{ id: string }>();
  const { data: activeWishlist, isError } = useWishlist(id);

  const relation = getUserRelation({ viewerId: activeWishlist?.user_id, ownerId: user?.id });
  const permissions = getPermissions(relation);

  if (isError) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">Ошибка загрузки страницы</div>;
  if (!activeWishlist) return <div className="pt-25 bg-gray-100 min-h-screen px-4">Вишлист не найден</div>;

  return (
    <main className="pt-25 sm:pt-30 px-2 sm:px-8 min-h-screen bg-gray-100">
      <div className="mb-3 sm:mb-5">
        <PageHeader
          title={activeWishlist.title}
          subtitle={activeWishlist.description}
          left={<BackButton />}
          right={permissions.canAdd && <WishlistItemCreateButton wishlistId={activeWishlist.id} />}
        />
      </div>
      <WishlistItemList wishlist={activeWishlist} permissions={permissions} />
    </main>
  );

  {
    /* <div>Настроить порядок: по дате, по цене, по названию</div>
      <div>Добавить фильтры: все подарки, забронированные, незабронированные, исполненные, неисполненные</div>

      <div>Подарки</div> */
  }
}

export default WishlistPage;
