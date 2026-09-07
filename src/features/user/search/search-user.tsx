import { Input } from "@/shared/ui/kit/input";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@/entities/user/model/user";
import { SearchList } from "../list/search.list";
import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { userRepository } from "@/entities/user/api/user.repository";
import { useSendFriendRequest } from "@/entities/request/friend-request/model/friend-request.mutations";
import { useMyFriends } from "@/entities/friend/model/friend.hooks";
import { useDeleteFriend } from "@/entities/friend/model/friend.mutations";

export function SearchUser() {
  const user = useRequiredUser();
  const { data: friends } = useMyFriends();
  const friendIds = friends?.map((friend) => friend.id);
  const sendFriendRequest = useSendFriendRequest();
  const deleteFriend = useDeleteFriend();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<(User & { isFriend: boolean })[] | null>(null);

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

  const handleDeleteFriend = useCallback(
    async (userId: string) => {
      if (!userId) {
        console.log("no user id");
        return;
      }
      try {
        await deleteFriend.mutateAsync(userId);
      } catch (error) {
        console.log(error);
      }
    },
    // TODO: check bounds
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
        const searchResult = await userRepository.search(debouncedSearch);
        const result = searchResult.map((user) =>
          friendIds?.includes(user.id) ? { ...user, isFriend: true } : { ...user, isFriend: false },
        );
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
        <SearchList
          users={searchResult}
          addFriend={handleAddFriend}
          deleteFriend={handleDeleteFriend}
        />
      </div>
    </>
  );
}
