export type ServiceResult<T = null> = {
  error: string | null;
  result: T | null;
};

export async function safeQuery<T>(query: PromiseLike<{ data: T | null; error: any }>): Promise<ServiceResult<T>> {
  try {
    const { data, error } = await query;

    if (error) {
      return { error: error.message, result: null };
    }

    return { error: null, result: data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Неизвестная ошибка",
      result: null,
    };
  }
}
