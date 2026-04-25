import type { User } from "@/entities/user/model/user";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/routes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit/tooltip";
import { Gem, Handshake, ScrollText } from "lucide-react";
import { Link } from "react-router";

type UserInfoProps = {
  user: User;
  isMobile: boolean;
};

export function UserInfo({ user, isMobile }: UserInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
      <UserBadge user={{ username: user.username ?? "", avatar_url: user.avatar_url ?? "" }} variant="vertical" size="lg" />

      <div className={cn("flex flex-col mt-3 items-center sm:items-start", isMobile && "gap-2")}>
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer p-0 font-medium hover:scale-102 transition-transform",
            isMobile ? "text-xl" : "text-lg",
          )}>
          <ScrollText size={isMobile ? 30 : 20} />
          <Link to={ROUTES.MY_WISHLISTS} className="flex items-center gap-1">
            Вишлисты
          </Link>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer p-0 font-medium hover:scale-102 transition-transform",
            isMobile ? "text-xl" : "text-lg",
          )}>
          <Handshake size={isMobile ? 30 : 20} />
          <Link to={ROUTES.FRIENDS} className="flex items-center gap-1">
            Друзья
          </Link>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex items-center gap-2 cursor-pointer p-0 font-medium",
                isMobile ? "text-xl text-gray-300" : "text-lg hover:text-gray-300 transition-colors",
              )}>
              <Link to={"/"} className=" p-0 flex items-center gap-1">
                <Gem size={isMobile ? 30 : 20} />
                Забронированные подарки
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent sideOffset={-10} side="bottom">
            <p>скоро появятся</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
