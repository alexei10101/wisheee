import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { UserInfo } from "@/features/user/info/user-info";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { ROUTES } from "@/shared/routes";
import { MenuCard } from "@/shared/ui/menu-card";
import { Bell, Gift, Heart, Users } from "lucide-react";

function MyProfilePage() {
  const user = useRequiredUser();
  const isMobile = !useMediaQuery("(min-width: 640px)");

  return (
    <main className="page">
      <div className="page-content flex flex-col gap-6 sm:gap-8">
        <h1 className="max-w-3xl">
          Добро пожаловать, <span>{user.username}</span>!
        </h1>
        <UserInfo user={user} isMobile={isMobile} avatar={user.avatar} />
        <section
          aria-label="Разделы профиля"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <MenuCard
            title={"Вишлисты"}
            description={"5 вишлистов"}
            icon={<Heart />}
            link={ROUTES.MY_WISHLISTS}
          ></MenuCard>
          <MenuCard
            title={"Друзья"}
            description={"4 друга"}
            icon={<Users />}
            link={ROUTES.FRIENDS}
          ></MenuCard>
          <MenuCard
            title={"Забронированные"}
            description={"10 подарков"}
            icon={<Gift />}
            link={"/"}
          ></MenuCard>
          <MenuCard
            title={"Уведомления"}
            description={"3 уведомления"}
            icon={<Bell />}
            link={ROUTES.NOTIFICATIONS}
          ></MenuCard>
        </section>
        <section className="rounded-2xl border border-border/60 bg-card/70 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl">Последняя активность</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>Максим зарезервировал подарок</li>
            <li>Анна создала новый wishlist</li>
            <li>У вас новый друг</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default MyProfilePage;
