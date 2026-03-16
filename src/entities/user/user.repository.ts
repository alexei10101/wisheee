import { supabase } from "@/shared/api/supabase-client";

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

  async update(id: string, editData: any) {
    return supabase.from("profiles").update(editData).eq("id", id).select().single();
  },
};
