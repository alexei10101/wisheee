import { FriendList } from "@/features/friend-list/friend.list";
import { SearchUser } from "@/features/search-user/search-user";
import { BackButton } from "@/shared/ui/back.button";
import { Button } from "@/shared/ui/kit/button";
import { PageHeader } from "@/shared/ui/page-header";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";

function FriendsPage() {
  const [mode, setMode] = useState<"search" | "all">("all");
  const toggleMode = () => setMode((prev) => (prev === "search" ? "all" : "search"));

  return (
    <main className="pt-25 sm:pt-30 px-2 sm:px-8 min-h-screen bg-gray-100">
      <div className="mb-3 sm:mb-5">
        <PageHeader
          title={mode === "all" ? "Мои друзья" : "Добавить друга"}
          left={<BackButton />}
          right={
            <Button className="me-4 w-full sm:w-40" onClick={toggleMode}>
              <span className="flex items-center gap-2" hidden={mode === "search"}>
                Добавить друга <UserPlus />
              </span>
              <span className="flex items-center gap-2" hidden={mode === "all"}>
                Мои друзья <Users />
              </span>
            </Button>
          }
        />
      </div>
      {mode === "all" && <FriendList />}
      {mode === "search" && <SearchUser />}
    </main>
  );
}

export default FriendsPage;
