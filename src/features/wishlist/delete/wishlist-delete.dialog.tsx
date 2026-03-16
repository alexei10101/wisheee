import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { UserAuth } from "@/app/contexts/auth.context";
import { wishlistService } from "@/entities/wishlist/model/wishlist.service";
import { UserWishlists } from "@/app/contexts/wishlist.context";

type WishlistDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlistId: string;
};

export const WishlistDeleteDialog = memo(function WishlistDeleteDialog({ open, onClose, wishlistId }: WishlistDeleteDialogProps) {
  const { user } = UserAuth();
  const { deleteWishlist } = UserWishlists();

  const handleDelete = async () => {
    if (!user?.id) return;
    const response = await wishlistService.delete(user.id, wishlistId);
    if (response.error) {
      console.log(response.error);
      onClose();
      return;
    }
    deleteWishlist(wishlistId);
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
          <DialogHeader>
            <DialogTitle className="font-semibold">Удалить все товары в списке?</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Это также удалит все ваши желания в этом вишлисте</DialogDescription>
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
