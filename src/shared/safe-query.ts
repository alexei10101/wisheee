export type ServiceResult<T = null> = {
  error: string | null;
  result: T | null;
};

export async function safeQuery<T>(
  query: PromiseLike<{ data: T | null; error: any }>,
): Promise<ServiceResult<T>> {
  try {
    const { data } = await query;

    // if (error) {
    //   return { error: error.message, result: null };
    // }

    return { error: null, result: data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
      result: null,
    };
  }
}
