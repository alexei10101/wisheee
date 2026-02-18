import { UserAuth } from "@/app/auth-context";
import { supabase } from "@/shared/api/supabase-client";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Handshake, House, Lightbulb, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function AppHeader() {
  // think about images: where to store them, how to upload them
  const { session, logout } = UserAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  // const [avatarUrl, setLastname] = useState<string>("");

  // useEffect(() => {
  //   if (!openDialog) return;
  //   setLoading(true);
  //   fetchUserProfile();
  //   setLoading(false);
  // }, [openDialog]);

  // const fetchUserProfile = async () => {
  //   const { data: profile } = await supabase.from("profiles").select("*").eq("id", session?.user.id).select("username, avatar_url");
  //   if (!profile || profile.length === 0) return;
  //   setName(profile[0].username.split(" ")[0] || "");
  //   setLastname(profile[0].username.split(" ")[1] || "");
  // };

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserProfile(name + " " + lastname);
    setOpenDialog(false);
  };

  const updateUserProfile = async (username: string) => {
    const { error } = await supabase.from("profiles").update({ username }).eq("id", session?.user.id).select();
    if (error) console.log("Не удалось обновить данные: " + error.message);
  };

  return (
    <header className="m-4 w-auto rounded-full border-0 shadow py-3 px-2.5 flex items-center">
      <p className="font-extrabold">WISHEEE</p>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="link" className="cursor-pointer">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <House />
            Моя страница
          </Link>
        </Button>
        <Button variant="link" className="cursor-pointer">
          <Link to={ROUTES.FRIENDS} className="flex items-center gap-1">
            <Handshake />
            Друзья
          </Link>
        </Button>
        <Button variant="link" className="cursor-pointer">
          <Link to={""} className="flex items-center gap-1">
            <Lightbulb /> Идеи подарков
          </Link>
        </Button>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="link" className="cursor-pointer flex items-center gap-1">
              <Settings />
              Настройки
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {loading ? (
              <div className="grid place-items-center">
                <Spinner />
              </div>
            ) : (
              <form onSubmit={handleSettingsSubmit}>
                <DialogHeader>
                  <DialogTitle>Редактирование профиля</DialogTitle>
                  <DialogDescription>Измените ваши персональные данные ниже</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 pt-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" name="name" placeholder="Иван" value={name} onChange={(e) => setName(() => e.target.value)} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lastname">Фамилия</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="Иванов"
                      value={lastname}
                      onChange={(e) => setLastname(() => e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Button variant="link" className="cursor-pointer" onClick={logout}>
          <LogOut />
          Выход
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
