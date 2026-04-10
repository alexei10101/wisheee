import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui/kit/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/shared/ui/kit/dropdown-menu";
import { Bell, House, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "../kit/badge";
import { useLogout } from "@/entities/user/model/user.mutations";
import { UserUpdateDialogButton } from "@/features/user-update/user-update.button";
import { useNotifications } from "@/entities/notification/model/notification.queries";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { Skeleton } from "../kit/skeleton";

export function AppHeader() {
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const logout = useLogout();
  const { data: notifications, isLoading: notificationsIsLoading } = useNotifications(user?.id);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);

  const unreadCount = notifications?.filter((n) => !n.is_read).length;

  const handleLogout = async () => {
    setDropdownMenuOpen(false);
    try {
      await logout.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="absolute bg-white top-4 left-2 sm:left-8 right-2 sm:right-8 rounded-full shadow py-3 px-2.5 flex items-center">
      <p className="font-extrabold ms-4 hidden sm:block">WISHEEE</p>
      <div className="sm:ml-auto flex items-center gap-5 justify-between w-full sm:w-auto">
        <Button variant="link" className="cursor-pointer p-0 hidden sm:flex">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <House />
          </Link>
        </Button>

        <Button variant="link" className="p-0  items-center gap-1 hidden sm:flex">
          <Link to={ROUTES.NOTIFICATIONS}>
            {unreadCount !== 0 && (
              <Badge variant="secondary" className="text-[11px]">
                {unreadCount}
              </Badge>
            )}
            {unreadCount === 0 && <Bell />}
          </Link>
        </Button>

        <DropdownMenu open={dropdownMenuOpen} onOpenChange={(open) => setDropdownMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <div className="pe-5 cursor-pointer">
              {userIsLoading ? (
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-25 h-5" />
                </div>
              ) : (
                <UserBadge user={{ username: user?.username ?? "", avatar_url: user?.avatar_url ?? "" }} />
              )}
            </div>
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

        <div className="flex gap-5 sm:hidden">
          <Link to={ROUTES.HOME}>
            <House size={26} />
          </Link>

          {notificationsIsLoading && <Skeleton className="w-7 h-7 rounded-full" />}
          {unreadCount === 0 && !notificationsIsLoading && (
            <Link to={ROUTES.NOTIFICATIONS}>
              <Bell />
            </Link>
          )}
          {unreadCount !== 0 && !notificationsIsLoading && (
            <Badge asChild variant="secondary">
              <Link to={ROUTES.NOTIFICATIONS}>
                <div className="text-[13px]"> {unreadCount}</div>
              </Link>
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
