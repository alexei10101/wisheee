import { useAuth } from "@/entities/user/model/use-auth";
import { UserInfo } from "@/features/user-info/user-info";

function HomePage() {
  const { user, loading } = useAuth();
// TODO loader
  if (loading) return <div>load</div>;

  return (
    <main className="pt-25 sm:pt-30 px-8 flex justify-center h-full">
      <UserInfo user={user} />
    </main>
  );
}

export default HomePage;
