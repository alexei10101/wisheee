import type { Permissions } from "@/shared/lib/permissions";
import { ActionMenu } from "@/shared/ui/action-menu";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared/ui/kit/dropdown-menu";
import { ArrowRight, Globe2, Heart, LockKeyhole, Pencil, Trash2 } from "lucide-react";
import { memo } from "react";
import type { Wishlist } from "../model/wishlist";

type WishlistCardProps = {
  wishlist: Wishlist;
  onOpen: (id: string) => void;
  onUpdate: () => void;
  onDelete: () => void;
  permissions: Permissions;
  isOwner: boolean;
};

export const WishlistCard = memo(function WishlistCard({
  wishlist,
  onUpdate,
  onDelete,
  onOpen,
  permissions,
  isOwner,
}: WishlistCardProps) {
  return (
    <article className="group grid w-full max-w-3xl grid-cols-[4.75rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[5.5rem_minmax(0,1fr)_auto]">
      <div className="m-3 grid size-13 place-items-center self-start rounded-2xl bg-primary/10 text-primary sm:m-4 sm:size-14">
        <Heart className="size-6" aria-hidden="true" />
      </div>

      <div className="min-w-0 py-4 pr-3 sm:py-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-base leading-snug font-semibold tracking-tight sm:text-lg">
            {wishlist.title}
          </h3>
          {isOwner && (
            <Badge
              variant="secondary"
              className="gap-1 border border-primary/15 bg-primary/10 text-primary"
            >
              {wishlist.isPublic ? (
                <Globe2 aria-hidden="true" />
              ) : (
                <LockKeyhole aria-hidden="true" />
              )}
              {wishlist.isPublic ? "Публичный" : "Приватный"}
            </Badge>
          )}
        </div>
        {wishlist.description?.trim() && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {wishlist.description}
          </p>
        )}
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2 border-t border-border/60 px-2 py-2 sm:col-span-1 sm:border-t-0 sm:px-4 sm:py-4">
        <Button
          type="button"
          className="min-h-10 flex-1 sm:flex-none"
          aria-label={`Открыть вишлист ${wishlist.title}`}
          onClick={() => onOpen(wishlist.id)}
        >
          <span aria-hidden="true">Открыть</span>
          <ArrowRight aria-hidden="true" />
        </Button>

        {(permissions.canUpdate || permissions.canDelete) && (
          <ActionMenu label="Действия с вишлистом">
            {permissions.canUpdate && (
              <DropdownMenuItem onSelect={onUpdate}>
                <Pencil aria-hidden="true" />
                Редактировать
              </DropdownMenuItem>
            )}
            {permissions.canUpdate && permissions.canDelete && <DropdownMenuSeparator />}
            {permissions.canDelete && (
              <DropdownMenuItem variant="destructive" onSelect={onDelete}>
                <Trash2 aria-hidden="true" />
                Удалить
              </DropdownMenuItem>
            )}
          </ActionMenu>
        )}
      </div>
    </article>
  );
});
