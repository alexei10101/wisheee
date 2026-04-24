import { Button } from "@/shared/ui/kit/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { UserUpdateDialog } from "./user-update.dialog";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";

export function UserUpdateDialogButton({ closeMenu }: { closeMenu: () => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const isMobile = !useMediaQuery("(min-width: 640px)");

  return (
    <>
      <Button variant="ghost" className="cursor-pointer w-full" onClick={() => setOpen(true)}>
        <Settings />
        Настройки
      </Button>
      <UserUpdateDialog
        open={open}
        isMobile={isMobile}
        onClose={() => {
          closeMenu();
          setOpen(false);
        }}
      />
    </>
  );
}
