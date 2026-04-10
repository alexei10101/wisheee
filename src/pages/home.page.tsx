import { useAuth } from "@/app/auth.context";
import { useUser } from "@/entities/user/model/user.queries";
import { UserInfo } from "@/features/user-info/user-info";
import { PageLoader } from "@/shared/ui/page-loader";

function HomePage() {
  const { userId } = useAuth();
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <PageLoader />;
  return (
    <main className="pt-25 sm:pt-30 px-8 flex justify-center h-full">
      <UserInfo user={user} />
    </main>
  );
}

export default HomePage;
