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
import { ThemeToggleButton } from "@/features/theme/theme-toggle.button";

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
    <header className="fixed top-3 right-2 left-2 z-40 flex items-center rounded-2xl border border-border/60 bg-card/90 px-2.5 py-2.5 shadow-lg shadow-foreground/5 backdrop-blur-xl transition-colors motion-reduce:transition-none sm:top-4 sm:right-8 sm:left-8 sm:rounded-full sm:py-3">
      <p className="ms-4 hidden font-cormorant text-xl font-extrabold sm:block">WISHEEE</p>
      <nav
        aria-label="Основная навигация"
        className="flex w-full items-center justify-between gap-2 sm:ml-auto sm:w-auto sm:gap-4"
      >
        <Link
          to={ROUTES.HOME}
          aria-label="На главную"
          className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-border/70 bg-background/60 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:shadow-md hover:shadow-primary/10 motion-reduce:transition-none sm:size-9"
        >
          <House size={18} aria-hidden="true" />
        </Link>

        <ThemeToggleButton />

        <DropdownMenu open={dropdownMenuOpen} onOpenChange={(open) => setDropdownMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Открыть меню профиля"
              className="rounded-full pe-2 leading-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:pe-1"
            >
              <UserBadge user={{ username: user.username, avatar: user.avatar }} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align={isMobile ? "start" : "end"}>
            {user && (
              <DropdownMenuGroup>
                <UserUpdateDialogButton closeMenu={() => setDropdownMenuOpen(false)} />
                <DropdownMenuSeparator />
                <Button variant="ghost" className="w-full cursor-pointer" onClick={handleLogout}>
                  <LogOut />
                  Выход
                </Button>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
