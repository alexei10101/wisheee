import { ROUTES } from "@/shared/routes";
import { Avatar, AvatarFallback } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/shared/ui/kit/dropdown-menu";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bell, Handshake, House, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "../kit/badge";
import { useNotificationStore } from "@/entities/notification/model/notification.store";
import { useAuth } from "@/entities/user/model/use-auth";
import { useLogout } from "@/entities/user/model/user.mutations";
import { UserUpdateDialogButton } from "@/features/user-update/user-update.button";

export function AppHeader() {
  const { user } = useAuth();
  const logout = useLogout();
  const newNotifications = useNotificationStore((state) => state.unreadCount());
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    setDropdownMenuOpen(false);
    logout.mutate();
  };

  return (
    <header className="absolute bg-white top-4 left-8 right-8 rounded-full shadow py-3 px-2.5 flex items-center">
      <p className="font-extrabold ms-4">WISHEEE</p>
      <div className="ml-auto flex items-center gap-10">
        <Button variant="link" className="cursor-pointer p-0">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <House />
            Моя страница
          </Link>
        </Button>

        <Button variant="link" className="cursor-pointer p-0">
          <Link to={ROUTES.FRIENDS} className="flex items-center gap-1">
            <Handshake />
            Друзья
          </Link>
        </Button>

        <Button asChild variant="link" className="p-0 flex items-center gap-1">
          <Link to={ROUTES.NOTIFICATIONS}>
            {newNotifications !== 0 && (
              <Badge variant="secondary" className="text-[11px]">
                {newNotifications}
              </Badge>
            )}
            {newNotifications === 0 && <Bell />}
            Уведомления
          </Link>
        </Button>

        {/* <Button variant="link" className="cursor-pointer p-0">
          <Link to={""} className="flex items-center gap-1">
            <Lightbulb /> Идеи подарков
          </Link>
        </Button> */}

        <DropdownMenu open={dropdownMenuOpen} onOpenChange={(open) => setDropdownMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Item variant="default" className="p-0 gap-2 cursor-pointer me-4">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                  <AvatarFallback>{(user?.username?.at(0) ?? "") + (user?.username?.at(1) ?? "")}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{user?.username}</ItemTitle>
              </ItemContent>
            </Item>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="center">
            {user && (
              <DropdownMenuGroup>
                <UserUpdateDialogButton closeMenu={() => setDropdownMenuOpen(false)} />

                <Button variant="ghost" className="cursor-pointer w-full" onClick={handleLogout}>
                  <LogOut />
                  Выход
                </Button>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
