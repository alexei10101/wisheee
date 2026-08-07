import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { useDeleteWishlistItem } from "@/entities/wishlist-item/model/item.mutations";

type WishlistItemDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlistItemId: string;
};

export const WishlistItemDeleteDialog = memo(function WishlistItemDeleteDialog({
  open,
  onClose,
  wishlistItemId,
}: WishlistItemDeleteDialogProps) {
  const deleteWishlistItem = useDeleteWishlistItem();

  const handleDelete = async () => {
    try {
      deleteWishlistItem.mutateAsync({ itemId: wishlistItemId });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogPortal>
        <DialogCustomOverlay />
        <DialogCustomContent>
          <DialogHeader className="pb-7">
            <DialogTitle className="font-semibold">
              Вы уверены, что хотите удалить подарок?
            </DialogTitle>
            <DialogDescription hidden={true} className="text-sm text-muted-foreground">
              Безвозвратно удалить подарок
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3">
            <Button variant="outline" className="sm:w-26" onClick={onClose}>
              Отмена
            </Button>
            <Button type="button" className="sm:w-26" onClick={handleDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
