import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import { UserAuth } from "@/app/contexts/auth.context";
import { UserWishlists } from "@/app/contexts/wishlist.context";
import { wishlistItemService } from "@/entities/wishlist-item/model/wishlist-item.service";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";

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
  const { user } = UserAuth();
  const { deleteWishlistItem } = UserWishlists();

  const handleDelete = async () => {
    if (!user?.id) return;
    const response = await wishlistItemService.delete(wishlistItemId);
    console.log(response);
    if (response.error) {
      console.log(response.error);
      onClose();
      return;
    }
    deleteWishlistItem(wishlistItemId);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
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
            <Button variant="outline" className="w-26" onClick={onClose}>
              Отмена
            </Button>
            <Button type="button" className="w-26" onClick={handleDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogCustomContent>
      </DialogPortal>
    </Dialog>
  );
});
