import { UserAuth } from "@/app/auth-context";
import { wishlistService } from "@/shared/services/wishlist.service";
import type { WishlistWithItems } from "@/shared/types/wishlist";
import type { WishlistItem } from "@/shared/types/wishlistItem";
import { Button } from "@/shared/ui/kit/button";
import { Spinner } from "@/shared/ui/kit/spinner";
import { DiamondPlus, Forward } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import WishlistItemDialogManager from "./wishlist-item-dialog-manager";
import { wishlistItemService } from "@/shared/services/wishlist-item.service";
import WishlistItemsList from "./wishlist-items-list";

const WishlistPage = () => {
  const { profile } = UserAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [wishlist, setWishlist] = useState<WishlistWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type OperationType = "create" | "delete" | "edit";
  type DialogResultMap = {
    create: Omit<WishlistItem, "id">;
    delete: void;
    edit: Partial<WishlistItem>;
  };
  type InternalResolver = {
    resolve: (data: unknown) => void;
    reject: () => void;
  };

  // Get wishlist
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadWishlist = async () => {
      setLoading(true);
      setError(null);

      const { result, error } = await wishlistService.read(id);

      if (!isMounted) return;

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setWishlist(result);
      setLoading(false);
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const [openDialog, setOpenDialog] = useState<{ isOpen: boolean; operation: OperationType | null }>({
    isOpen: false,
    operation: null,
  });
  const resolverDialogRef = useRef<InternalResolver | null>(null);
  const wishlistItemDataRef = useRef<WishlistItem | null>(null);
  const openDialogPromise = <T extends OperationType>(operation: T): Promise<DialogResultMap[T]> => {
    setOpenDialog({ isOpen: true, operation });
    return new Promise<DialogResultMap[T]>((resolve, reject) => {
      resolverDialogRef.current = { resolve: resolve as (data: unknown) => void, reject };
    });
  };
  const closeDialog = () => {
    setOpenDialog({ isOpen: false, operation: null });
    resolverDialogRef.current = null;
    wishlistItemDataRef.current = null;
  };

  const handleCreate = async () => {
    if (!profile?.id || !wishlist?.id) return;
    try {
      const dialogResult = await openDialogPromise("create");
      const res = await wishlistItemService.create(dialogResult);
      if (res.error) {
        console.log(res.error);
        return;
      }
      if (wishlist.id !== res.result?.wishlist_id) return;
      setWishlist((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wishlist_items: [...(prev.wishlist_items ?? []), res.result!],
        };
      });
    } catch {
    } finally {
      closeDialog();
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!profile?.id) return;
      try {
        await openDialogPromise("delete");
        const res = await wishlistItemService.delete(id);
        if (res.error) {
          console.log(res.error);
          return;
        }
        setWishlist((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist_items: prev.wishlist_items.filter((item) => item.id !== id),
          };
        });
      } catch {
      } finally {
        closeDialog();
      }
    },
    [profile?.id],
  );

  const handleUpdate = useCallback(
    async (id: WishlistItem["id"]) => {
      if (!profile?.id) return;

      try {
        const wishlistItem = wishlist?.wishlist_items.find((item) => item.id === id);
        if (!wishlistItem) return;
        wishlistItemDataRef.current = wishlistItem;
        const dialogResult = await openDialogPromise("edit");
        const res = await wishlistItemService.update({ ...wishlistItem, ...dialogResult });
        if (res.error) {
          console.log(res.error);
          return;
        }
        setWishlist((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist_items: prev.wishlist_items.map((item) => (item.id === id ? res.result! : item)),
          };
        });
      } catch {
      } finally {
        closeDialog();
      }
    },
    [profile?.id, wishlist],
  );

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  if (error) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">{error}</div>;
  if (!wishlist) return <div className="pt-25 bg-gray-100 min-h-screen px-4">Вишлист не найден</div>;

  return (
    <section className="pt-25 px-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-5">
        <Button variant="link" onClick={handleBack}>
          ← Назад
        </Button>
        <Button className="me-4" onClick={handleCreate}>
          Добавить подарок <DiamondPlus />
        </Button>
      </div>

      <div className="flex gap-5 mb-6 justify-between px-4">
        <div>
          <div className="flex gap-2 content-start">
            <div className="text-4xl">{wishlist.title}</div>
            <Forward size={20} className="cursor-pointer" />
          </div>
          <p className="text-muted-foreground text-xl">{wishlist.description}</p>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap items-baseline">
        {wishlist.wishlist_items.length === 0 && <div className="flex flex-col mx-auto text-lg text-center">Вишлист пуст</div>}

        <div className="flex flex-wrap justify-between gap-5 text-lg">
          <WishlistItemsList wishlistItems={wishlist.wishlist_items} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </div>

        <WishlistItemDialogManager
          open={openDialog}
          resolver={resolverDialogRef.current}
          wishlistId={wishlist.id}
          wishlistItem={wishlistItemDataRef.current}
        />
      </div>
      {/* <div>Настроить порядок: по дате, по цене, по названию</div>
      <div>Добавить фильтры: все подарки, забронированные, незабронированные, исполненные, неисполненные</div>

      <div>Подарки</div> */}
    </section>
  );
};

export default WishlistPage;
