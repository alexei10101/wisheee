import { useAuth } from "@/entities/user/model/use-auth";
import { UserInfo } from "@/features/user-info/user-info";

function HomePage() {
  const { user, loading } = useAuth();

  if (loading) return <div>load</div>;

  return (
    <main className="pt-30 px-8 flex justify-center">
      <UserInfo user={user} />
    </main>
  );
}

// мои вишлисты
// забронированные подарки

export default HomePage;
