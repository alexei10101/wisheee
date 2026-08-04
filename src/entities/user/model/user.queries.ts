export const userKeys = {
  me: () => ["users", "me"] as const,
  user: (userId: string) => ["users", userId] as const,
};
