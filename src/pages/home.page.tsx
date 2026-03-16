import { PageHeader } from "@/shared/ui/page-header";
import { WishlistCreateButton } from "@/features/wishlist/create/wishlist-create.button";
import { WishlistList } from "@/features/wishlist/list/wishlist.list";

function HomePage() {
  return (
    <main>
      <PageHeader style={"pt-30 px-8"} title="Мои вишлисты" right={<WishlistCreateButton />} />
      <WishlistList />
    </main>
  );
}

export default HomePage;
