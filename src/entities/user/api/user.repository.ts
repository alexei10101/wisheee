import { supabase } from "@/shared/api/supabase-client";
import type { User } from "../model/user";

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

  async update(id: string, updateData: Pick<User, "username" | "avatarLink">) {
    return supabase.from("profiles").update(updateData).eq("id", id).select().single();
  },
};
