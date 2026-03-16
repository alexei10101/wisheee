import { Button } from "@/shared/ui/kit/button";
import { DiamondPlus } from "lucide-react";
import { useState } from "react";
import { WishlistItemCreateDialog } from "./wishlist-item-create.dialog";

export function WishlistItemCreateButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Добавить желание <DiamondPlus />
      </Button>
      <WishlistItemCreateDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
