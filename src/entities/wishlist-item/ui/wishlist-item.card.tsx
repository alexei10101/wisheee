import type { WishlistItem } from "@/entities/wishlist-item/model/wishlist-item";
import type { Permissions } from "@/shared/lib/permissions";
import { Button } from "@/shared/ui/kit/button";
import { BookmarkPlus, ExternalLink, Pencil, Trash } from "lucide-react";
import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import { cn } from "@/shared/lib/css";

type WishlistItemProps = {
  wishlistItem: WishlistItem;
  permissions: Permissions;
  handleDelete?: (id: string) => void;
  handleUpdate?: (id: string) => void;
  handleReserve?: (id: string) => void;
  isMobile: boolean;
  onOpen: (link: string) => void;
};

export const WishlistItemCard = memo(function ({
  wishlistItem,
  permissions,
  handleDelete,
  handleUpdate,
  handleReserve,
  isMobile,
  onOpen,
}: WishlistItemProps) {
  const [opened, setOpened] = useState(false);
  const wasDragging = useRef(false);

  return (
    <div className="relative w-full sm:w-auto grow">
      {isMobile && permissions.canUpdate && permissions.canDelete && (
        <div className="absolute top-0.5 right-0 flex flex-col items-center gap-2 pr-3 z-0">
          <Button
            variant="ghost"
            onClick={
              handleUpdate
                ? () => {
                    handleUpdate(wishlistItem.id);
                    setOpened(false);
                  }
                : undefined
            }
            className="hover:bg-white">
            <Pencil />
          </Button>
          <Button variant="ghost" onClick={handleDelete ? () => handleDelete(wishlistItem.id) : undefined} className="hover:bg-white">
            <Trash />
          </Button>
        </div>
      )}

      {isMobile && permissions.canReserve && (
        <div className="absolute top-0.5 right-0 flex flex-col items-center gap-2 pr-3 z-0">
          <Button
            variant="ghost"
            onClick={
              handleReserve
                ? () => {
                    handleReserve(wishlistItem.id);
                    setOpened(false);
                  }
                : undefined
            }
            className="hover:bg-white">
            <BookmarkPlus />
          </Button>
          <Button variant="ghost" onClick={() => onOpen(wishlistItem.link)} className="hover:bg-white">
            <ExternalLink />
          </Button>
        </div>
      )}

      <motion.div
        className="relative"
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: -72, right: 0 }}
        dragElastic={0.1}
        dragSnapToOrigin
        onDragStart={() => {
          wasDragging.current = true;
        }}
        onDragEnd={(_, info) => {
          setTimeout(() => {
            wasDragging.current = false;
          }, 0);

          if (info.offset.x < -30) setOpened(true);
          else setOpened(false);
        }}
        animate={{ x: opened ? -72 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}>
        <div
          className={cn("bg-gray-800 z-10 absolute inset-0 rounded-xl transition-opacity", {
            "opacity-20": !!wishlistItem.reserver,
            "opacity-0": !wishlistItem.reserver,
          })}></div>
        <Item
          variant="outline"
          className="rounded-xl sm:rounded-2xl bg-card shadow-sm p-0 sm:p-4 flex sm:gap-4 relative cursor-pointer overflow-hidden"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("button")) return;
            if (wasDragging.current) return;
            if (!opened) onOpen(wishlistItem.link);
            else setOpened(false);
          }}>
          <ItemMedia className="w-24 h-24 rounded-s-xl bg-muted shrink-0 -mt-1">
            {wishlistItem.image_url && <img src={wishlistItem.image_url} className="object-cover" />}
            {!wishlistItem.image_url && (
              <div className="w-full h-full flex items-center text-xs text-center text-muted-foreground">Нет изображения</div>
            )}
          </ItemMedia>
          <ItemContent className="flex flex-col gap-0 sm:gap-3 w-full sm:max-w-1/2 self-start">
            <ItemTitle className="font-semibold text-base">{wishlistItem.title}</ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">{wishlistItem.description?.trim() || `\u00A0`}</ItemDescription>
            {wishlistItem.price !== 0 && (
              <p className="absolute bottom-1 right-2 text-muted-foreground text-[12px]">≈{wishlistItem.price.toLocaleString()} ₽</p>
            )}
          </ItemContent>

          {!isMobile && permissions.canUpdate && permissions.canDelete && (
            <ItemActions className="ml-auto hidden sm:flex">
              <Button variant="ghost" onClick={handleUpdate ? () => handleUpdate(wishlistItem.id) : undefined}>
                <Pencil />
              </Button>
              <Button variant="ghost" onClick={handleDelete ? () => handleDelete(wishlistItem.id) : undefined}>
                <Trash />
              </Button>
            </ItemActions>
          )}
        </Item>
      </motion.div>
    </div>
  );
});
