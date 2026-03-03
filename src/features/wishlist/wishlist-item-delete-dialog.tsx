import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogCustomContent, DialogCustomOverlay } from "../../shared/ui/dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";

type WishlistItemDeleteDialogProps = {
  open: boolean;
  resolver: { resolve: () => void; reject: () => void } | null;
};

function WishlistItemDeleteDialog({ open, resolver }: WishlistItemDeleteDialogProps) {
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
            <DialogTitle className="font-semibold">Вы уверены, что хотите удалить подарок?</DialogTitle>
            <DialogDescription hidden={true} className="text-sm text-gray-800">
              Безвозвратно удалить подарок
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              className="w-26"
              onClick={() => {
                resolver?.reject();
              }}>
              Отмена
            </Button>
            <Button type="button" className="w-26" onClick={() => resolver?.resolve()}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
}

export default memo(WishlistItemDeleteDialog);
