import type { User } from "@/entities/user/model/user";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui/kit/button";
import { Gem, Handshake, ScrollText } from "lucide-react";
import { Link } from "react-router";

type UserInfoProps = {
  user: User | undefined;
};

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex gap-5">
      <UserBadge user={{ username: user?.username ?? "", avatar_url: user?.avatar_url ?? "" }} variant="vertical" size="xl" />

      <div className="flex flex-col text-xl mt-3">
        <Button variant="link" className="justify-start cursor-pointer p-0">
          <Link to={ROUTES.WISHLISTS} className="flex items-center gap-1">
            <ScrollText />
            Вишлисты
          </Link>
        </Button>

        <Button variant="link" className="justify-start cursor-pointer p-0">
          <Link to={ROUTES.FRIENDS} className="flex items-center gap-1">
            <Handshake />
            Друзья
          </Link>
        </Button>

        <Button variant="link" className="justify-start cursor-pointer p-0">
          <Link to={"/"} className="flex items-center gap-1">
            <Gem />
            Забронированные подарки
          </Link>
        </Button>
      </div>
    </div>
  );
}
