import type { WishlistItem } from "@/entities/wishlist-item/model/item";
import type { Permissions } from "@/shared/lib/permissions";
import { ActionMenu } from "@/shared/ui/action-menu";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared/ui/kit/dropdown-menu";
import { BookmarkMinus, BookmarkPlus, ExternalLink, Gift, Pencil, Trash2 } from "lucide-react";
import { memo } from "react";

type WishlistItemProps = {
  wishlistItem: WishlistItem;
  permissions: Permissions;
  handleDelete?: (id: string) => void;
  handleUpdate?: (id: string) => void;
  handleReserve?: (id: string) => void;
  onOpen: (link: string) => void;
};

const priceFormatter = new Intl.NumberFormat("ru-RU");

export const WishlistItemCard = memo(function WishlistItemCard({
  wishlistItem,
  permissions,
  handleDelete,
  handleUpdate,
  handleReserve,
  onOpen,
}: WishlistItemProps) {
  const price = wishlistItem.price;
  const hasLink = wishlistItem.link.trim().length > 0;
  const hasPrice = price != null && price !== 0;
  const isReserved = Boolean(wishlistItem.reserver);

  return (
    <article className="group relative grid w-full max-w-3xl grid-cols-[6.5rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[8rem_minmax(0,1fr)_auto]">
      <div className="min-h-26 overflow-hidden rounded-s-xl bg-muted sm:min-h-32 sm:rounded-s-2xl">
        {wishlistItem.image ? (
          <img
            src={wishlistItem.image}
            alt={wishlistItem.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full min-h-26 flex-col items-center justify-center gap-2 px-2 text-center text-xs text-muted-foreground sm:min-h-32">
            <Gift className="size-6 text-primary/70" aria-hidden="true" />
            <span>Нет изображения</span>
          </div>
        )}
      </div>

      <div className="min-w-0 px-2 py-4 sm:px-3 sm:py-5">
        <div className="flex min-w-0 flex-wrap items-start gap-2">
          <h3 className="min-w-0 text-base leading-snug font-semibold tracking-tight sm:text-lg">
            {wishlistItem.title}
          </h3>
          {isReserved && (
            <Badge
              variant="secondary"
              className="border border-primary/15 bg-primary/10 text-primary"
            >
              Забронировано
            </Badge>
          )}
        </div>

        {wishlistItem.description.trim() && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {wishlistItem.description}
          </p>
        )}

        {hasPrice && (
          <p className="mt-3 text-base font-semibold tabular-nums sm:text-lg">
            {priceFormatter.format(price)} ₽
          </p>
        )}
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2 border-t border-border/60 px-2 py-2 sm:col-span-1 sm:border-t-0 sm:px-4 sm:py-4">
        {permissions.canReserve && handleReserve && (
          <Button
            type="button"
            variant={isReserved ? "secondary" : "default"}
            className="min-h-10 flex-1 sm:flex-none"
            onClick={() => handleReserve(wishlistItem.id)}
          >
            {isReserved ? (
              <BookmarkMinus aria-hidden="true" />
            ) : (
              <BookmarkPlus aria-hidden="true" />
            )}
            {isReserved ? "Снять бронь" : "Забронировать"}
          </Button>
        )}

        <Button
          type="button"
          disabled={hasLink ? false : true}
          variant={permissions.canReserve ? "outline" : "default"}
          className="min-h-10 flex-1 sm:flex-none"
          aria-label="Открыть магазин"
          onClick={() => onOpen(wishlistItem.link)}
        >
          <ExternalLink aria-hidden="true" />
          <span aria-hidden="true" className="inline">
            Открыть
          </span>
        </Button>

        {(permissions.canUpdate || permissions.canDelete) && (
          <ActionMenu label="Действия с желанием">
            {permissions.canUpdate && handleUpdate && (
              <DropdownMenuItem onSelect={() => handleUpdate(wishlistItem.id)}>
                <Pencil aria-hidden="true" />
                Редактировать
              </DropdownMenuItem>
            )}
            {permissions.canUpdate && permissions.canDelete && handleUpdate && handleDelete && (
              <DropdownMenuSeparator />
            )}
            {permissions.canDelete && handleDelete && (
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => handleDelete(wishlistItem.id)}
              >
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
