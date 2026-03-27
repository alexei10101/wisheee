import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { useDeleteWishlistItem } from "@/entities/wishlist-item/model/wishlist-item.mutations";
import { useAuth } from "@/entities/user/model/use-auth";

type WishlistItemDeleteDialogProps = {
  wishlistId: string;
  open: boolean;
  onClose: () => void;
  wishlistItemId: string;
};

export const WishlistItemDeleteDialog = memo(function WishlistItemDeleteDialog({
  wishlistId,
  open,
  onClose,
  wishlistItemId,
}: WishlistItemDeleteDialogProps) {
  const { user } = useAuth();
  const deleteWishlistItem = useDeleteWishlistItem();

  const handleDelete = async () => {
    if (!user?.id) return;

    try {
      deleteWishlistItem.mutateAsync({ wishlistId, wishlistItemId, userId: user.id });
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
