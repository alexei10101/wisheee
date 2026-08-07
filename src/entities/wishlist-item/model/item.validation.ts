import z from "zod";

export const CreateWishlistItemSchema = z.object({
  wishlistId: z.string().nonempty(),
  title: z.string().nonempty(),
  description: z.string(),
  link: z.string(),
  price: z.coerce.number().int().nonnegative().nullable().default(null),
  image: z.string(),
});

export const UpdateWishlistItemSchema = z.object({
  wishlistId: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  price: z.coerce.number<number>().int().nonnegative().nullable().optional(),
  image: z.string().optional(),
});

export type CreateWishlistItemType = z.input<typeof CreateWishlistItemSchema>;
export type UpdateWishlistItemType = z.input<typeof UpdateWishlistItemSchema>;
