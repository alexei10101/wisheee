import { Button } from "@/shared/ui/kit/button";
import { BookCheck, BookOpenCheck, HatGlasses, Pencil, Trash } from "lucide-react";
import { memo, useRef, useState } from "react";
import type { Wishlist } from "../model/wishlist";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/shared/ui/kit/item";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit/tooltip";
import type { Permissions } from "@/shared/lib/permissions";
import { motion } from "framer-motion";

type WishlistCardProps = {
  wishlist: Wishlist;
  onOpen: (id: string) => void;
  onUpdate: () => void;
  onDelete: () => void;
  permissions: Permissions;
  isMobile: boolean;
};

export const WishlistCard = memo(function WishlistCard({ wishlist, onUpdate, onDelete, onOpen, permissions, isMobile }: WishlistCardProps) {
  const [opened, setOpened] = useState(false);
  const wasDragging = useRef(false);
  const size = isMobile ? "sm" : "default";

  return (
    <div className="relative w-full sm:max-w-2xl overflow-hidden">
      {isMobile && permissions.canUpdate && permissions.canDelete && (
        <div className="absolute top-0.5 right-0 flex flex-col items-center gap-2 pr-3 z-0">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => {
              onUpdate();
              setOpened(false);
            }}>
            <Pencil />
          </Button>
          <Button variant="ghost" size={"sm"} onClick={onDelete}>
            <Trash />
          </Button>
        </div>
      )}

      <motion.div
        drag={isMobile && permissions.canDelete && permissions.canUpdate ? "x" : false}
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
        <Item
          size={size}
          variant="outline"
          className="relative z-10 cursor-pointer bg-card shadow-sm"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("button")) return;
            if (wasDragging.current) return;
            if (!opened) onOpen(wishlist.id);
            else setOpened(false);
          }}>
          <ItemContent className="flex flex-col gap-3 w-full sm:max-w-1/2">
            <div className="flex gap-2 items-center">
              {isMobile && !wishlist.isPublic && <HatGlasses size={15} />}
              <ItemTitle>{wishlist.title}</ItemTitle>
            </div>

            <ItemDescription>{wishlist.description?.trim() || `\u00A0`}</ItemDescription>
          </ItemContent>

          {permissions.canUpdate && permissions.canDelete && (
            <ItemActions className="ml-auto hidden sm:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">{wishlist.isPublic ? <BookOpenCheck /> : <BookCheck />}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{wishlist.isPublic ? "Публичный" : "Приватный"}</p>
                </TooltipContent>
              </Tooltip>

              <Button variant="ghost" onClick={onUpdate}>
                <Pencil />
              </Button>
              <Button variant="ghost" onClick={onDelete}>
                <Trash />
              </Button>
            </ItemActions>
          )}
        </Item>
      </motion.div>
    </div>
  );
});
