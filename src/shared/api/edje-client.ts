import type { ServiceResult } from "./safe-query";

const EDJE_BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;

export const EdgeOperation = {
  updateFriendNotification: "update-friend-notifications",
} as const;
export type EdgeOperation = (typeof EdgeOperation)[keyof typeof EdgeOperation];

export async function callEdge<T = null>(path: EdgeOperation, accessToken: string, body: unknown): Promise<ServiceResult<T>> {
  try {
    const res = await fetch(`${EDJE_BASE_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { error: "Ошибка edge функции", result: null };
    }

    const data = await res.json();
    return { error: null, result: data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Неизвестная ошибка edge функции",
      result: null,
    };
  }
}
