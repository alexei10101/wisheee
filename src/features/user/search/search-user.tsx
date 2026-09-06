import { Input } from "@/shared/ui/kit/input";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@/entities/user/model/user";
import { SearchList } from "../list/search.list";
import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { userRepository } from "@/entities/user/api/user.repository";
import { useSendFriendRequest } from "@/entities/request/friend-request/model/friend-request.mutations";

export function SearchUser() {
  const user = useRequiredUser();
  const sendFriendRequest = useSendFriendRequest();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<User[] | null>(null);

  const handleAddFriend = useCallback(
    async (addresseeId: string) => {
      if (!addresseeId) {
        console.log("no addresseeId");
        return;
      }
      try {
        await sendFriendRequest.mutateAsync(addresseeId);
      } catch (error) {
        console.log(error);
      }
    },
    [user?.id],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const result = await userRepository.search(debouncedSearch);
        setSearchResult(result ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    if (!debouncedSearch) return setSearchResult(null);

    handleSearch();
  }, [debouncedSearch]);

  return (
    <>
      <Input
        autoFocus
        className="bg-card"
        placeholder="Поиск"
        value={search}
        onChange={(value) => setSearch(value.target.value)}
      />
      <div className="mt-5">
        <SearchList users={searchResult} addFriend={handleAddFriend} />
      </div>
    </>
  );
}
