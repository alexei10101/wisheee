import { UserAuth } from "@/app/auth-context";
import { ROUTES } from "@/shared/model/routes";
import { Avatar, AvatarFallback } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/shared/ui/kit/dropdown-menu";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Handshake, House, Lightbulb, LogOut, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { ProfileEditDialog } from "./profile-edit-dialog";
import type { Profile } from "@/shared/types/profile";

function AppHeader() {
  // TODO: think about images: where to store them, how to upload them
  const { profile, updateProfile, logout } = UserAuth();

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const resolverEditRef = useRef<{
    resolve: ({}: Partial<Profile>) => void;
    reject: () => void;
  } | null>(null);
  const openEditForm = (): Promise<Partial<Profile>> => {
    setOpenDialog(true);
    return new Promise<Partial<Profile>>((resolve, reject) => {
      resolverEditRef.current = { resolve, reject };
    });
  };

  const handleProfileEdit = async () => {
    if (!profile?.id) return;

    try {
      const editData = await openEditForm();
      if (!editData) return;

      const res = await updateProfile(editData);

      if (res.error) {
        console.error(res.error);
        return;
      }
    } catch {
    } finally {
      setOpenDialog(false);
      setDropdownMenuOpen(false);
      resolverEditRef.current = null;
    }
  };

  return (
    <header className="absolute bg-white top-4 left-1/2 -translate-x-1/2 w-[95%] rounded-full shadow py-3 px-2.5 flex items-center">
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

        <Button variant="link" className="cursor-pointer p-0">
          <Link to={""} className="flex items-center gap-1">
            <Lightbulb /> Идеи подарков
          </Link>
        </Button>

        <DropdownMenu open={dropdownMenuOpen} onOpenChange={(open) => setDropdownMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Item variant="default" className="p-0 gap-2 cursor-pointer me-4">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                  <AvatarFallback>{(profile?.username?.at(0) ?? "") + (profile?.username?.at(1) ?? "")}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{profile?.username}</ItemTitle>
              </ItemContent>
            </Item>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="center">
            {profile && (
              // TODO: уведомления (запросы в друзья)
              <DropdownMenuGroup>
                <ProfileEditDialog open={openDialog} data={profile} resolver={resolverEditRef.current} />
                <Button variant="ghost" className="cursor-pointer w-full" onClick={handleProfileEdit}>
                  <Settings />
                  Настройки
                </Button>

                <Button
                  variant="ghost"
                  className="cursor-pointer w-full"
                  onClick={() => {
                    setDropdownMenuOpen(false);
                    logout();
                  }}>
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

export default AppHeader;
