export const friendKeys = {
  all: ["friends"] as const,
  me: ["friends", "my"] as const,
  user: (userId: string) => ["friends", userId] as const,
};
