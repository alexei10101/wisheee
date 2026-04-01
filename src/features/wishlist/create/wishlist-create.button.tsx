import { Button } from "@/shared/ui/kit/button";
import { DiamondPlus } from "lucide-react";
import { useState } from "react";
import { WishlistCreateDialog } from "./wishlist-create.dialog";

export function WishlistCreateButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Добавить вишлист <DiamondPlus />
      </Button>
      <WishlistCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
