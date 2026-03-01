import { wishlistService } from "@/shared/services/wishlist.service";
import type { Wishlist } from "@/shared/types/wishlist";
import { Button } from "@/shared/ui/kit/button";
import { Spinner } from "@/shared/ui/kit/spinner";
import { ArrowBigLeft, DiamondPlus, Forward, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get wishlist
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadWishlist = async () => {
      setLoading(true);
      setError(null);

      const { result, error } = await wishlistService.read(id);

      if (!isMounted) return;

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setWishlist(result);
      setLoading(false);
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, [id]);
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  if (error) return <div className="pt-25 px-4 text-red-500">{error}</div>;
  if (!wishlist) return <div className="pt-25 px-4">Вишлист не найден</div>;

  const handleCreate = () => {};

  return (
    <section className="pt-25 px-4">
      <div className="flex gap-5 ">
        <ArrowBigLeft className="w-10 h-10 cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className="text-4xl">{wishlist.title}</div>
          <p className="text-muted-foreground text-xl">{wishlist.description}</p>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap items-baseline">
        <h2 className="text-3xl">Подарки вишлиста</h2>
        <Button variant="ghost" className="hover:bg-gray-300" onClick={handleCreate}>
          <DiamondPlus />
        </Button>
      </div>
      <div>
        Добавить подарок <Plus />
      </div>
      <div>
        <Forward />
      </div>

      <div>Настроить порядок: по дате, по цене, по названию</div>
      <div>Добавить фильтры: все подарки, забронированные, незабронированные, исполненные, неисполненные</div>

      <div>Подарки</div>
    </section>
  );
};

export default WishlistPage;
