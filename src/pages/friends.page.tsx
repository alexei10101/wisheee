import { FriendList } from "@/features/user/list/friend.list";
import { SearchUser } from "@/features/user/search/search-user";
import { BackButton } from "@/shared/ui/back.button";
import { Button } from "@/shared/ui/kit/button";
import { PageHeader } from "@/shared/ui/page-header";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";

function FriendsPage() {
  const [mode, setMode] = useState<"search" | "all">("all");
  const toggleMode = () => setMode((prev) => (prev === "search" ? "all" : "search"));

  return (
    <main className="page">
      <div className="page-content">
        <div className="mb-6 sm:mb-8">
          <PageHeader
            title={mode === "all" ? "Мои друзья" : "Добавить друга"}
            left={<BackButton />}
            right={
              <Button className="w-full sm:me-4 sm:w-40" onClick={toggleMode}>
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
      </div>
    </main>
  );
}

export default FriendsPage;
