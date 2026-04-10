import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import { DialogCustomContent, DialogCustomOverlay } from "@/shared/ui/dialog";
import { useDeleteWishlist } from "@/entities/wishlist/model/wishlist.mutations";
import { useCurrentUser } from "@/entities/user/model/use-current-user";

type WishlistDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  wishlistId: string;
};

export const WishlistDeleteDialog = memo(function WishlistDeleteDialog({ open, onClose, wishlistId }: WishlistDeleteDialogProps) {
  const { data: user } = useCurrentUser();
  const deleteWishlist = useDeleteWishlist();

  const handleDelete = async () => {
    if (!user?.id) return;
    try {
      await deleteWishlist.mutateAsync({ userId: user.id, wishlistId });
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
          <DialogHeader>
            <DialogTitle className="font-semibold">Удалить вишлист?</DialogTitle>
            <DialogDescription className="text-sm text-gray-800">Также будут удалены ваши желания в этом вишлисте</DialogDescription>
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
