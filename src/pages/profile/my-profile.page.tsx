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
    <main className="page flex flex-col gap-4">
      <h1>
        Добро пожаловать, <span>{user.username}</span>!
      </h1>
      <UserInfo user={user} isMobile={isMobile} avatar={user.avatar} />
      <div className="flex gap-4 justify-center">
        <MenuCard title={"Вишлисты"} description={"5 вишлистов"} icon={<Heart />} link={ROUTES.MY_WISHLISTS}></MenuCard>
        <MenuCard title={"Друзья"} description={"4 друга"} icon={<Users />} link={ROUTES.FRIENDS}></MenuCard>
        <MenuCard title={"Забронированные"} description={"10 подарков"} icon={<Gift />} link={"/"}></MenuCard>
        <MenuCard title={"Уведомления"} description={"3 уведомления"} icon={<Bell />} link={ROUTES.NOTIFICATIONS}></MenuCard>
      </div>
      <div>
        <h2>Последняя активность</h2>
        <ul>
          <li> • Максим зарезервировал подарок</li>
          <li> • Анна создала новый wishlist</li>
          <li> • У вас новый друг</li>
        </ul>
      </div>
    </main>
  );
}

export default MyProfilePage;
