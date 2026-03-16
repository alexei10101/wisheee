import type { FriendRequestStatus } from "@/entities/friend-request/friend-request";

export async function updateFriendRequestStatus(entityId: string, status: Omit<FriendRequestStatus, "pending">) {
  const res = await fetch(`/api/update-notification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entityId, status }),
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) throw new Error(data.error || "Ошибка обновления уведомлений");
  return data;
}
