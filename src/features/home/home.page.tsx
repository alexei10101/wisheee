import { UserAuth } from "@/app/auth-context";
import { DiamondPlus, Gift, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Wishlist } from "@/shared/types/wishlist";
import { createWishlist, deleteWishlist, editWishlist } from "./model/dialog-operations";
import { Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import WishlistDialogManager from "./ui/wishlist-dialog-manager";
import { Button } from "@/shared/ui/kit/button";
import WishlistsList from "./ui/wishlists-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";

type OperationType = "create" | "delete" | "edit";
type DialogResultMap = {
  create: Omit<Wishlist, "user_id" | "id">;
  delete: boolean;
  edit: Partial<Wishlist>;
};
type InternalResolver = {
  resolve: (data: unknown) => void;
  reject: () => void;
};

const HomePage = () => {
  const { profile } = UserAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    setWishlists(profile?.wishlists ?? []);
  }, [profile?.id]);

  const [openDialog, setOpenDialog] = useState<{ isOpen: boolean; operation: OperationType | null }>({
    isOpen: false,
    operation: null,
  });
  const resolverDialogRef = useRef<InternalResolver | null>(null);
  const wishlistDataRef = useRef<Partial<Wishlist> | null>(null);
  const openDialogPromise = <T extends OperationType>(operation: T): Promise<DialogResultMap[T]> => {
    setOpenDialog({ isOpen: true, operation });

    return new Promise<DialogResultMap[T]>((resolve, reject) => {
      resolverDialogRef.current = { resolve: resolve as (data: unknown) => void, reject };
    });
  };
  const handleCreate = useCallback(async () => {
    if (!profile?.id) return;

    try {
      const dialogResult = await openDialogPromise("create");
      const res = await createWishlist(profile.id, dialogResult);
      if (res.error) {
        console.log(res.error);
        return;
      }
      setWishlists((prev) => [res.result as Wishlist, ...prev]);
    } catch {
    } finally {
      setOpenDialog({ isOpen: false, operation: null });
      resolverDialogRef.current = null;
    }
  }, [profile?.id, createWishlist]);
  const handleDelete = useCallback(
    async (id: string) => {
      if (!profile?.id) return;

      try {
        const dialogResult = await openDialogPromise("delete");
        const res = await deleteWishlist(profile.id, id, dialogResult);
        if (res.error) {
          console.log(res.error);
          return;
        }
        setWishlists((prev) => prev.filter((pr) => pr.id !== id));
      } catch {
      } finally {
        setOpenDialog({ isOpen: false, operation: null });
        resolverDialogRef.current = null;
      }
    },
    [profile?.id, deleteWishlist],
  );
  const handleEdit = useCallback(
    async (wishlist: Wishlist) => {
      if (!profile?.id) return;

      wishlistDataRef.current = wishlist;

      try {
        const dialogResult = await openDialogPromise("edit");
        const res = await editWishlist(profile.id, wishlist.id, dialogResult);
        if (res.error) {
          console.log(res.error);
          return;
        }
        setWishlists((prev) => prev.map((pr) => (pr.id === wishlist.id ? { ...pr, ...dialogResult } : pr)));
      } catch {
      } finally {
        setOpenDialog({ isOpen: false, operation: null });
        resolverDialogRef.current = null;
        wishlistDataRef.current = null;
      }
    },
    [profile?.id, editWishlist],
  );

  return (
    <main className="m-auto flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center gap-3 pt-25 pb-4">
        <Item variant="default" className="flex flex-col gap-3 p-0">
          <ItemMedia>
            <Avatar className="size-25">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>{(profile?.username.at(0) ?? "") + (profile?.username.at(1) ?? "")}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-xl">{profile?.username}</ItemTitle>
          </ItemContent>
        </Item>
        <div className="flex flex-row items-center text-m gap-8">
          <p className="flex gap-1">
            <Gift /> Подарки
          </p>
          <Link to={ROUTES.FRIENDS}>
            <p className="flex gap-1">
              <Users />
              Друзья
            </p>
          </Link>
        </div>
      </section>
      <section className="bg-gray-100 p-4 border-gray-200 border-y-2 flex-1">
        {profile && (
          <>
            <div className="flex gap-6 flex-wrap items-baseline">
              <h2 className="text-3xl">Мои вишлисты</h2>
              <Button variant="ghost" className="hover:bg-gray-300" onClick={handleCreate}>
                <DiamondPlus />
              </Button>
            </div>

            <WishlistDialogManager open={openDialog} resolver={resolverDialogRef.current} data={wishlistDataRef.current} />
            <WishlistsList wishlists={wishlists} onDelete={handleDelete} onEdit={handleEdit} />
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
