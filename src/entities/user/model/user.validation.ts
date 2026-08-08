import z from "zod";

export const UpdateUserSchema = z.object({
  username: z.string().min(2, "Минимум 2 символа").optional(),
  avatar: z.union([z.instanceof(File), z.null()]).optional(),
});

export type UpdateUserType = z.input<typeof UpdateUserSchema>;
