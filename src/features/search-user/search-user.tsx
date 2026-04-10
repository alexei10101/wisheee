import { friendService } from "@/entities/friend/model/friend.service";
import { Input } from "@/shared/ui/kit/input";
import { useCallback, useEffect, useState } from "react";
import type { FriendRequestMetadata } from "@/entities/request/friend-request/model/friend-request";
import type { User } from "@/entities/user/model/user";
import { useSendFriendRequest } from "@/entities/request/friend-request/model/friend-request.mutations";
import { SearchList } from "../search-list/search.list";
import { useCurrentUser } from "@/entities/user/model/use-current-user";

export function SearchUser() {
  const { data: user } = useCurrentUser();
  const sendFriendRequest = useSendFriendRequest();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<User[] | null>(null);

  const handleAddFriend = useCallback(
    async (receiverId: string, receiverUsername: string, receiverAvatar: string) => {
      if (!user?.id) return;
      const metadata: FriendRequestMetadata = {
        sender_username: user.username,
        sender_avatar: user.avatar_url ?? "",
        receiver_username: receiverUsername,
        receiver_avatar: receiverAvatar,
      };
      try {
        await sendFriendRequest.mutateAsync({ senderId: user.id, receiverId, metadata });
      } catch (error) {
        console.log(error);
      }
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
    if (!user?.id) return;
    const handleSearch = async () => {
      try {
        const res = await friendService.searchUsers(debouncedSearch, user.id);
        if (res.error) return console.log(res.error);
        if (!res.result) return setSearchResult(null);
        setSearchResult(res.result);
      } catch {}
    };
    if (!debouncedSearch) return setSearchResult(null);
    handleSearch();
  }, [debouncedSearch]);

  return (
    <>
      <Input className="bg-white" placeholder="Поиск" value={search} onChange={(value) => setSearch(value.target.value)} />
      <div className="mt-5">
        <SearchList list={searchResult} addFriend={handleAddFriend} />
      </div>
    </>
  );
}
