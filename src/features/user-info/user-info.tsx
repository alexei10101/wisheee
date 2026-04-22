import type { User } from "@/entities/user/model/user";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui/kit/button";
import { Gem, Handshake, ScrollText } from "lucide-react";
import { Link } from "react-router";

type UserInfoProps = {
  user: User;
};

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
      <UserBadge user={{ username: user.username, avatar_url: user.avatar_url }} variant="vertical" size="lg" />

      <div className="flex flex-col text-xl mt-3 items-center sm:items-start">
        <Button variant="link" className="cursor-pointer p-0">
          <Link to={ROUTES.MY_WISHLISTS} className="flex items-center gap-1">
            <ScrollText />
            Вишлисты
          </Link>
        </Button>

        <Button variant="link" className="cursor-pointer p-0">
          <Link to={ROUTES.FRIENDS} className="flex items-center gap-1">
            <Handshake />
            Друзья
          </Link>
        </Button>

        <Button variant="link" className="cursor-pointer p-0">
          <Link to={"/"} className="flex items-center gap-1">
            <Gem />
            Забронированные подарки
          </Link>
        </Button>
      </div>
    </div>
  );
}
