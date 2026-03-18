import type { ServiceResult } from "./safe-query";

export function unwrap<T>(result: ServiceResult<T>): T {
  if (result.error) throw new Error(result.error);
  if (result.result === null) throw new Error("Нет результата");
  return result.result;
}
