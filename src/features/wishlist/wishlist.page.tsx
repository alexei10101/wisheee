import { UserAuth } from "@/app/auth-context";
import { Button } from "@/shared/ui/kit/button";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { profile } = UserAuth();
  const { id } = useParams<{ id: string }>();
  const wishlist = profile?.wishlists.find((wishlist) => wishlist.id === id);
  if (!wishlist) return;

  return (
    <section className="pt-25 px-4">
      <div className="flex gap-5 ">
        <ArrowBigLeft className="w-10 h-10 cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className="text-4xl">{wishlist.title}</div>
          <p className="text-muted-foreground text-xl">{wishlist.description}</p>
        </div>
      </div>

      <div>Добавить подарок</div>
      <div>Поделиться вишлистом</div>

      <div>Настроить порядок: по дате, по цене, по названию</div>
      <div>Добавить фильтры: все подарки, забронированные, незабронированные, исполненные, неисполненные</div>

      <div>Подарки</div>
    </section>
  );
};

export default WishlistPage;
