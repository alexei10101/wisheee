import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { House, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useLogout } from "@/features/auth/model/auth.mutations";
import { UserUpdateDialogButton } from "@/features/user/update/user-update.button";
import { UserBadge } from "@/entities/user/ui/user.badge";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { useRequiredUser } from "@/entities/user/model/user.hooks";

export function AppHeader() {
  const user = useRequiredUser();
  const logout = useLogout();
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
  const isMobile = !useMediaQuery("(min-width: 640px)");

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
      <p className="font-extrabold ms-4 hidden sm:block font-cormorant text-xl">WISHEEE</p>
      <div className="sm:ml-auto flex items-center gap-5 justify-between w-full sm:w-auto">
        <Button variant="link" className="cursor-pointer p-0 hidden sm:flex">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <House />
          </Link>
        </Button>

        <DropdownMenu open={dropdownMenuOpen} onOpenChange={(open) => setDropdownMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <div className="pe-5 cursor-pointer leading-0">
              <UserBadge user={{ username: user.username, avatar: user.avatar }} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align={isMobile ? "start" : "end"}>
            {user && (
              <DropdownMenuGroup>
                <UserUpdateDialogButton closeMenu={() => setDropdownMenuOpen(false)} />
                <DropdownMenuSeparator />
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
        </div>
      </div>
    </header>
  );
}
