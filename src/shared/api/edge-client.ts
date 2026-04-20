import type { ApiResponse } from "./edge-response.type";

const EDGE_BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;

export const EdgeOperation = {
  updateFriendNotification: "update-friend-notifications",
  reserveWishlistItem: "reserve-wishlist-item",
} as const;
export type EdgeOperation = (typeof EdgeOperation)[keyof typeof EdgeOperation];

export async function callEdge<T = null>(path: EdgeOperation, accessToken: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${EDGE_BASE_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data: ApiResponse<T> = await res.json();
    return data;
  } catch (e) {
    return {
      ok: false,
      error: {
        code: "NETWORK_ERROR",
        message: e instanceof Error ? e.message : "Unknown network error",
      },
    };
  }
}
