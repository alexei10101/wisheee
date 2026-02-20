import { UserAuth } from "@/app/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Gift, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ListOfWishes from "./list-of-wishes";
import type { Wishlist } from "@/shared/types/wishlist";
import { WishlistCreateDialog } from "./wishlist-create-dialog";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/shared/api/supabase-client";
import { WishlistDeleteDialog } from "./wishlist-delete-dialog";
import { WishlistEditDialog } from "./wishlist-edit-dialog";

const HomePage = () => {
  const { profile } = UserAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  useEffect(() => {
    setWishlists(profile?.wishlists ?? []);
  }, [profile]);

  const handleSubmit = async (data: Omit<Wishlist, "user_id" | "id">) => {
    if (!profile) return;

    const newWishlist = { id: uuidv4(), user_id: profile.id, ...data };

    try {
      const { error } = await supabase
        .from("wishlists")
        .upsert({
          ...newWishlist,
        })
        .single();
      if (error) {
        console.log(error);
        return;
      }
      setWishlists((prev) => [newWishlist, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const resolverConfirmRef = useRef<{ resolve: (value: boolean) => void; reject: () => void } | null>(null);

  const openConfirm = (): Promise<boolean> => {
    setOpenDeleteDialog(true);

    return new Promise<boolean>((resolve, reject) => {
      resolverConfirmRef.current = { resolve, reject };
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const deleteItems = await openConfirm();
      resolverConfirmRef.current = null;

      const { error } = await supabase.from("wishlists").delete().eq("id", id).eq("user_id", profile?.id);

      if (error) {
        console.error("Ошибка удаления:", error.message);
        throw error;
      }

      setWishlists((prev) => prev.filter((pr) => pr.id !== id));

      if (deleteItems) {
        console.log("Удаляем также товары");
        // TODO: вызываем RPC
      }
    } catch {}
  };

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const wishlistDataRef = useRef<Partial<Wishlist> | null>(null);
  const resolverEditRef = useRef<{
    resolve: ({}: Partial<Wishlist>) => void;
    reject: () => void;
  } | null>(null);

  const handleEdit = async (wishlist: Partial<Wishlist>) => {
    try {
      wishlistDataRef.current = wishlist;
      const editData = await openEditForm();

      resolverEditRef.current = null;
      wishlistDataRef.current = null;

      const { error } = await supabase.from("wishlists").update(editData).eq("id", wishlist.id).eq("user_id", profile?.id);

      if (error) {
        console.error("Ошибка изменения:", error.message);
        throw error;
      }

      setWishlists((prev) => prev.map((pr) => (pr.id === wishlist.id ? { ...pr, ...editData } : pr)));
    } catch {}
  };

  const openEditForm = (): Promise<Partial<Wishlist>> => {
    setOpenEditDialog(true);

    return new Promise<Partial<Wishlist>>((resolve, reject) => {
      resolverEditRef.current = { resolve, reject };
    });
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

      <section>
        {/* <h2 className="text-5xl">Созданные списки</h2> */}
        {profile && <WishlistCreateDialog onSubmit={handleSubmit} profileId={profile?.id} />}
        {/* {profile && <WishlistDeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} resolver={resolverRef.current}  />} */}
        {profile && <WishlistDeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} resolver={resolverConfirmRef.current} />}
        {profile && (
          <WishlistEditDialog
            open={openEditDialog}
            setOpen={setOpenEditDialog}
            data={wishlistDataRef.current}
            resolver={resolverEditRef.current}
          />
        )}

        <div className="flex flex-col gap-4">
          {wishlists?.map((wishlist) => (
            <ListOfWishes key={wishlist.id} wishlist={wishlist} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
