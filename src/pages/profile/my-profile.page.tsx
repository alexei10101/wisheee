import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { UserInfo } from "@/features/user-info/user-info";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";

function MyProfilePage() {
  const user = useRequiredUser();
  const isMobile = !useMediaQuery("(min-width: 640px)");

  return (
    <main className="pt-25 sm:pt-30 px-8 pb-4 flex justify-center h-full">
      <UserInfo user={user} isMobile={isMobile} />
    </main>
  );
}

export default MyProfilePage;
