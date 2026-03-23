import type { FriendRequestStatus } from "@/entities/request/friend-request/model/friend-request";

export async function updateFriendRequestStatus(senderId: string, entityId: string, status: Omit<FriendRequestStatus, "pending">) {
  const res = await fetch(`/api/update-notification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, entityId, status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка обновления уведомлений");
  return data;
}
