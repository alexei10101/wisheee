import { UserAuth } from "@/app/contexts/auth.context";
import { UserWishlists } from "@/app/contexts/wishlist.context";
import { wishlistService } from "@/entities/wishlist/model/wishlist.service";
import { WishlistItemCreateButton } from "@/features/wishlist-item/create/wishlist-item-create.button";
import { WishlistItemList } from "@/features/wishlist-item/list/wishlist-item.list";
import { BackButton } from "@/shared/ui/back.button";
import { Spinner } from "@/shared/ui/kit/spinner";
import { PageHeader } from "@/shared/ui/page-header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function WishlistPage() {
  const { user } = UserAuth();
  const { activeWishlist, setActiveWishlist } = UserWishlists();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user?.id) return;
    let isMounted = true;

    const loadWishlist = async () => {
      setLoading(true);
      setError(null);
      const { result, error } = await wishlistService.get(id);
      if (!isMounted) return;
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setActiveWishlist(result);
      setLoading(false);
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, [id, user?.id, setActiveWishlist]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  if (error) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">{error}</div>;
  if (!activeWishlist) return <div className="pt-25 bg-gray-100 min-h-screen px-4">Вишлист не найден</div>;

  return (
    <main className="bg-gray-100 min-h-screen px-8">
      <PageHeader
        style={"pt-30 mb-5"}
        title={activeWishlist.title}
        subtitle={activeWishlist.description}
        left={<BackButton />}
        right={<WishlistItemCreateButton />}
      />
      <WishlistItemList wishlist={activeWishlist} />
    </main>
  );

  {
    /* <div>Настроить порядок: по дате, по цене, по названию</div>
      <div>Добавить фильтры: все подарки, забронированные, незабронированные, исполненные, неисполненные</div>

      <div>Подарки</div> */
  }
}

export default WishlistPage;
