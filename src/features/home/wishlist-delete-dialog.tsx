import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogCustomContent, DialogCustomOverlay } from "../../shared/ui/dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo, useState } from "react";

type WishlistDeleteDialogProps = {
  open: boolean;
  resolver: { resolve: (value: boolean) => void; reject: () => void } | null;
};

function WishlistDeleteDialog({ open, resolver }: WishlistDeleteDialogProps) {
  const [deleteItems, setDeleteItems] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resolver?.reject();
        }
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
                }}>
                Отмена
              </Button>
            </DialogClose>
            <Button type="button" className="w-26" onClick={() => resolver?.resolve(deleteItems)}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
}

export default memo(WishlistDeleteDialog);
