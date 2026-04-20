import type { FriendRequestStatus } from "@/entities/request/friend-request/model/friend-request";
import { callEdge } from "@/shared/api/edje-client";
import type { Session } from "@supabase/supabase-js";

export async function updateFriendRequestStatus(session: Session, entityId: string, status: Omit<FriendRequestStatus, "pending">) {
  const body = {
    entityId,
    status,
  };

  return callEdge("update-friend-notifications", session.access_token, body);
}
