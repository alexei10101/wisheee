import { Button } from "@/shared/ui/kit/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { UserUpdateDialog } from "./user-update.dialog";

export function UserUpdateDialogButton({ closeMenu }: { closeMenu: () => void }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="ghost" className="cursor-pointer w-full" onClick={() => setOpen(true)}>
        <Settings />
        Настройки
      </Button>
      <UserUpdateDialog
        open={open}
        onClose={() => {
          closeMenu();
          setOpen(false);
        }}
      />
    </>
  );
}
