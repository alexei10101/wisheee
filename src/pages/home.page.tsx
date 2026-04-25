import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { UserInfo } from "@/features/user-info/user-info";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { PageLoader } from "@/shared/ui/page-loader";

function HomePage() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const isMobile = !useMediaQuery("(min-width: 640px)");

  if (isLoading) return <PageLoader />;
  if (isError || !user) return <div className="pt-25 bg-gray-100 min-h-screen px-4 text-red-500">Ошибка загрузки страницы</div>;
  return (
    <main className="pt-25 sm:pt-30 px-8 pb-4 flex justify-center h-full">
      <UserInfo user={user} isMobile={isMobile} />
    </main>
  );
}

export default HomePage;
