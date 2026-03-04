import { UserAuth } from "@/app/auth-context";
import { Button } from "@/shared/ui/kit/button";
import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router";
import FriendsList from "./friends-list";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/kit/input";
import { friendsService } from "@/shared/services/friends.service";
import type { Profile } from "@/shared/types/profile";

const FriendsPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const { profile } = UserAuth();
  const [friends, setFriends] = useState<Profile[] | null>(null);

  const [mode, setMode] = useState<"search" | "all">("all");
  const toggleMode = () => {
    setMode((prev) => (prev === "search" ? "all" : "search"));
  };

  useEffect(() => {
    if (!profile?.friends) return;
    const getFriends = async () => {
      const friendIds = profile.friends.map((f) => f.friend_id);
      const res = await friendsService.getFriendsInfo(friendIds);
      if (res.error) return console.log(res.error);
      setFriends(res.result);
    };
    getFriends();
  }, [profile?.friends]);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<Profile[] | null>(null);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (!profile?.id) return;
    const handleSearch = async () => {
      try {
        const res = await friendsService.searchUsers(debouncedSearch, profile.id);
        if (res.error) return console.log(res.error);
        if (!res.result) return setSearchResult([]);
        setSearchResult(res.result);
      } catch {}
    };
    if (!debouncedSearch) return setSearchResult(null);
    handleSearch();
  }, [debouncedSearch]);

  return (
    <section className="pt-25 px-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-5">
        <Button variant="link" onClick={handleBack}>
          ← Назад
        </Button>

        <Button className="me-4 w-40" onClick={toggleMode}>
          <span className="flex items-center gap-2" hidden={mode === "search"}>
            Добавить друга <UserPlus />
          </span>
          <span className="flex items-center gap-2" hidden={mode === "all"}>
            Мои друзья <Users />
          </span>
        </Button>
      </div>

      <div className="flex gap-5 mb-6 justify-between px-4">
        <div>
          <div className="flex gap-2 content-start">
            <div className="text-4xl">{mode === "all" ? "Мои друзья" : "Добавить друга"}</div>
          </div>
        </div>
      </div>

      {mode === "all" && friends && <FriendsList cardVariant="default" list={friends} />}
      {mode === "search" && (
        <div className="mx-4">
          <Input className="bg-white" placeholder="Поиск" value={search} onChange={(value) => setSearch(value.target.value)} />
          {searchResult && (
            <div className="mt-5">
              {searchResult.length > 0 && <FriendsList cardVariant="thin" list={searchResult} />}
              {searchResult.length === 0 && <div>По вашему запросу ничего не найдено</div>}
            </div>
          )}

          {/* Results of search */}
          {/* TODO: pagination */}
          {/* <div>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Назад
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Вперед
            </button>
          </div> */}
        </div>
      )}
    </section>
  );
};

export default FriendsPage;
