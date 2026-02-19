import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogCustomContent, DialogCustomOverlay } from "./ui/dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { useState } from "react";

type WishlistDeleteDialogProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  resolver: { resolve: (value: boolean) => void; reject: () => void } | null;
};

export function WishlistDeleteDialog({ open, setOpen, resolver }: WishlistDeleteDialogProps) {
  const [deleteItems, setDeleteItems] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}>
      <DialogPortal>
        <DialogCustomOverlay />
        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">Удалить все товары в списке?</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">
              Это безвозвратно удалит ваши сохраненные в список товары
            </DialogDescription>
          </DialogHeader>
          <div className="leading-none text-sm flex pe-3 py-1 gap-2 text-[#0a0a0a]">
            <input id="wishlist-form-delete" type="checkbox" checked={deleteItems} onChange={(e) => setDeleteItems(e.target.checked)} />
            <label htmlFor="wishlist-form-delete" className="flex cursor-pointer">
              Удалить товары
            </label>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-26"
                onClick={() => {
                  resolver?.reject();
                  resolver = null;
                }}>
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="wishlist-form"
              className="w-26"
              onClick={() => {
                resolver?.resolve(deleteItems);
                resolver = null;
                setOpen(false);
              }}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
}
