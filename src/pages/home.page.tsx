import { PageHeader } from "@/shared/ui/page-header";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";
import { useAuth } from "@/entities/user/model/use-auth";

function HomePage() {
  const { user } = useAuth();

  return (
    <main>
      <PageHeader style={"pt-30 px-8"} title="Мои вишлисты" right={<WishlistCreateButton />} />
      <WishlistList userId={user?.id} />
    </main>
  );
}

export default HomePage;
