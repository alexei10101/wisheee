import { friendService } from "@/entities/friend/friend.service";
import { Input } from "@/shared/ui/kit/input";
import { useCallback, useEffect, useState } from "react";
import { FriendList } from "../friend-list/friend.list";
import { friendsRequestService } from "@/entities/friend-request/friend-request.service";
import type { FriendRequestMetadata } from "@/entities/friend-request/friend-request";
import { useAuth } from "@/entities/user/model/use-auth";
import type { User } from "@/entities/user/model/user";

export function SearchUser() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [searchResult, setSearchResult] = useState<User[] | null>(null);

  const handleAddFriend = useCallback(
    async (receiverId: string, receiverUsername: string, receiverAvatar: string) => {
      if (!user?.id) return;
      const metadata: FriendRequestMetadata = {
        sender_username: user.username,
        sender_avatar: user.avatarLink,
        receiver_username: receiverUsername,
        receiver_avatar: receiverAvatar,
      };
      friendsRequestService.sendFriendRequest(user.id, receiverId, metadata);
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
        if (!res.result) return setSearchResult([]);
        setSearchResult(res.result);
      } catch {}
    };
    if (!debouncedSearch) return setSearchResult(null);
    handleSearch();
  }, [debouncedSearch]);

  return (
    <>
      <Input className="bg-white" placeholder="Поиск" value={search} onChange={(value) => setSearch(value.target.value)} />
      {searchResult && (
        <div className="mt-5">
          {searchResult.length > 0 && <FriendList cardVariant="thin" list={searchResult} addFriend={handleAddFriend} />}
          {searchResult.length === 0 && <div>По вашему запросу ничего не найдено</div>}
        </div>
      )}
    </>
  );
}
