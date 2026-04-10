import { supabase } from "@/shared/api/supabase-client";
import type { User } from "../model/user";
import type { File } from "zod/v4/core";

export const userRepository = {
  async get(id: string) {
    return supabase
      .from("profiles")
      .select(
        `
        *,
        wishlists (
          id,
          title,
          description
        ),
        friends!friends_user_id_fkey (
          friend_id
        )
      `,
      )
      .eq("id", id)
      .order("created_at", { foreignTable: "wishlists", ascending: false })
      .single();
  },
  async update(id: string, updateData: Pick<User, "username"> & { avatar_url: string | null }) {
    return supabase.from("profiles").update(updateData).eq("id", id).select().single();
  },

  async uploadAvatar(file: File, filePath: string) {
    return supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
  },
  getPublicUrl(filePath: string) {
    return supabase.storage.from("avatars").getPublicUrl(filePath);
  },
  async removeAvatar(path: string) {
    return supabase.storage.from("avatars").remove([path]);
  },
};
