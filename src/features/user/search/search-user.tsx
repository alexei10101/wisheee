import { Input } from "@/shared/ui/kit/input";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@/entities/user/model/user";
import { SearchList } from "../list/search.list";
import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { userRepository } from "@/entities/user/api/user.repository";

export function SearchUser() {
  const user = useRequiredUser();
  // const sendFriendRequest = useSendFriendRequest();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<User[] | null>(null);

  const handleAddFriend = useCallback(
    async (receiverId: string, receiverUsername: string, receiverAvatar: string) => {
      //   if (!user?.id || user.id === receiverId) return;
      //   const metadata: FriendRequestMetadata = {
      //     sender_username: user.username,
      //     sender_avatar: user.avatar_url,
      //     receiver_username: receiverUsername,
      //     receiver_avatar: receiverAvatar,
      //   };
      //   try {
      //     await sendFriendRequest.mutateAsync({ senderId: user.id, receiverId, metadata });
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
    [user?.id],
  );

  useEffect(() => {
    let timeout = setTimeout(() => {
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
      <Input className="bg-card" placeholder="Поиск" value={search} onChange={(value) => setSearch(value.target.value)} />
      <div className="mt-5">
        <SearchList users={searchResult} addFriend={handleAddFriend} />
      </div>
    </>
  );
}
