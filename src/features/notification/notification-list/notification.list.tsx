import NotificationCard from "@/entities/notification/ui/notification-card";
import { ItemGroup } from "@/shared/ui/kit/item";
import { useCallback } from "react";
import { useAcceptFriendRequest, useRejectFriendRequest } from "@/entities/request/friend-request/model/friend-request.mutations";
import type { AppNotification } from "@/entities/notification/model/notification";

type NotificationListProps = {
  userId: string | undefined;
  notifications: AppNotification[];
};

export function NotificationList({ userId, notifications }: NotificationListProps) {
  const acceptFriendRequest = useAcceptFriendRequest();
  const rejectFriendRequest = useRejectFriendRequest();
  
  const handleAcceptingRequest = useCallback(
    (receiverId: string, requestId: string) => {
      if (!userId) return;
      acceptFriendRequest.mutate({ senderId: userId, receiverId, requestId }, { onError: (error) => console.log(error) });
    },
    [userId, acceptFriendRequest],
  );
  const handleRejectingRequest = useCallback(
    (receiverId: string, requestId: string) => {
      if (!userId) return;
      rejectFriendRequest.mutate({ senderId: userId, receiverId, requestId }, { onError: (error) => console.log(error) });
    },
    [userId, rejectFriendRequest],
  );

  // const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // const toggleSelect = (id: string) => {
  //   setSelectedIds((prev) => {
  //     const next = new Set(prev);
  //     if (next.has(id)) next.delete(id);
  //     else next.add(id);
  //     return next;
  //   });
  // };
  // const selectAll = (ids: string[]) => {
  //   setSelectedIds(new Set(ids));
  // };
  // const clearSelection = () => {
  //   setSelectedIds(new Set());
  // };
  // const selectedCount = selectedIds.size;
  // const allIds = notifications?.map((n) => n.id) ?? [];
  // const isAllSelected = allIds.length > 0 && selectedIds.size === allIds.length;
  // const handleMarkSelected = () => {
  //   if (!user?.id) return;
  //   markAsRead.mutate({ userId: user.id, ids: Array.from(selectedIds) });
  //   clearSelection();
  // };

  if (!userId) return null;
  return (
    <>
      <div className="flex items-center gap-3 mb-4"></div>
      <ItemGroup className="gap-4">
        {notifications?.map((n) => (
          <NotificationCard
            key={n.id}
            userId={userId}
            notification={n}
            onAccept={() => handleAcceptingRequest(n.sender_id, n.entity_id)}
            onReject={() => handleRejectingRequest(n.sender_id, n.entity_id)}
            // selected={selectedIds.has(n.id)}
            // onSelect={() => toggleSelect(n.id)}
          />
        ))}
      </ItemGroup>
    </>
  );
}
