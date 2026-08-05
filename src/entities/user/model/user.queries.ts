export const userKeys = {
  all: ["users"] as const,
  me: ["users", "me"] as const,
  user: (userId: string) => ["users", userId] as const,
};
