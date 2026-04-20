import type { FriendRequestStatus } from "@/entities/request/friend-request/model/friend-request";
import { callEdge, EdgeOperation } from "@/shared/api/edje-client";
import type { Session } from "@supabase/supabase-js";

export async function updateFriendRequestStatus(session: Session, entityId: string, status: Omit<FriendRequestStatus, "pending">) {
  const body = {
    entityId,
    status,
  };

  return callEdge(EdgeOperation.updateFriendNotification, session.access_token, body);
}
