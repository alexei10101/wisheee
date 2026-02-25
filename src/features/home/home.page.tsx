import { UserAuth } from "@/app/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Gift, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ListOfWishes from "./list-of-wishes";
import type { Wishlist } from "@/shared/types/wishlist";
import { WishlistCreateDialog } from "./wishlist-create-dialog";
import { WishlistDeleteDialog } from "./wishlist-delete-dialog";
import { WishlistEditDialog } from "./wishlist-edit-dialog";
import { createWishlist, deleteWishlist, editWishlist } from "./model/dialog-operations";

const HomePage = () => {
  const { profile } = UserAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  useEffect(() => {
    setWishlists(profile?.wishlists ?? []);
  }, [profile]);

  const handleCreate = async (data: Omit<Wishlist, "user_id" | "id">) => {
    if (!profile) return;
    const res = await createWishlist(profile.id, data);
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return;
    }
    setWishlists((prev) => [res.result as Wishlist, ...prev]);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const resolverConfirmRef = useRef<{ resolve: (value: boolean) => void; reject: () => void } | null>(null);
  const openDeleteConfirm = (): Promise<boolean> => {
    setOpenDeleteDialog(true);
    return new Promise<boolean>((resolve, reject) => {
      resolverConfirmRef.current = { resolve, reject };
    });
  };
  const handleDelete = async (id: string) => {
    if (!profile) return;

    const deleteItems = await openDeleteConfirm();
    resolverConfirmRef.current = null;

    const res = await deleteWishlist(profile.id, id, deleteItems);
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return;
    }

    setWishlists((prev) => prev.filter((pr) => pr.id !== id));
  };

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const wishlistDataRef = useRef<Partial<Wishlist> | null>(null);
  const resolverEditRef = useRef<{
    resolve: ({}: Partial<Wishlist>) => void;
    reject: () => void;
  } | null>(null);

  const openEditForm = (): Promise<Partial<Wishlist>> => {
    setOpenEditDialog(true);
    return new Promise<Partial<Wishlist>>((resolve, reject) => {
      resolverEditRef.current = { resolve, reject };
    });
  };
  const handleEdit = async (wishlist: Wishlist) => {
    if (!profile) return;

    wishlistDataRef.current = wishlist;
    const editData = await openEditForm();
    resolverEditRef.current = null;
    wishlistDataRef.current = null;

    const res = await editWishlist(profile.id, wishlist.id, editData);
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return;
    }
    setWishlists((prev) => prev.map((pr) => (pr.id === wishlist.id ? { ...pr, ...editData } : pr)));
  };

  return (
    <main className="container m-auto py-5">
      <section className="flex flex-col items-center justify-center gap-12">
        <Avatar className="max-w-1/6 min-w-32 rounded-lg overflow-hidden">
          <AvatarImage className="w-full h-full" src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
        <p>{profile?.username}</p>
        <div className="flex flex-row items-center gap-8">
          <p className="flex gap-1">
            <Gift /> Подарки
          </p>
          <p className="flex gap-1">
            <Users />
            Друзья
          </p>
        </div>
      </section>
      {profile && (
        <section>
          {/* <h2 className="text-5xl">Созданные списки</h2> */}
          <WishlistCreateDialog onSubmit={handleCreate} profileId={profile?.id} />
          <WishlistDeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} resolver={resolverConfirmRef.current} />
          <WishlistEditDialog
            open={openEditDialog}
            setOpen={setOpenEditDialog}
            data={wishlistDataRef.current}
            resolver={resolverEditRef.current}
          />

          <div className="flex flex-col gap-4">
            {wishlists?.map((wishlist) => (
              <ListOfWishes key={wishlist.id} wishlist={wishlist} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage;
