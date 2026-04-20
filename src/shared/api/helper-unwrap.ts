import type { ApiResponse } from "./edge-response.type";
import type { ServiceResult } from "./safe-query";

export function unwrap<T>(result: ServiceResult<T>): T {
  if (result.error) throw new Error(result.error);
  if (result.result === null) throw new Error("Нет результата");
  return result.result;
}

export function unwrapApiResponse<T>(result: ApiResponse<T>): T {
  if (!result.ok) throw new Error(result.error.message);
  if (result.ok && result.data === null) throw new Error("Нет результата");
  return result.data;
}
