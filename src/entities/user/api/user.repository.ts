import { supabase } from "@/shared/supabase-client";
import type { User, UserUpdateDto } from "../model/user";
import type { File } from "zod/v4/core";
import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";

export const userRepository = {
  async me(): Promise<User | null> {
    const { data } = await api.get<ApiResponse<User | null>>("/users/me");
    return data.data;
  },
  async search(query: string): Promise<User[]> {
    const { data } = await api.get<ApiResponse<User[]>>(`/users/search?q=${query}`);
    return data.data;
  },
  // TODO check errors
  async getById(id: string): Promise<User | null> {
    const { data } = await api.get<ApiResponse<User | null>>("/users/" + id);
    return data.data;
  },
  // TODO check unique username
  async update(updateData: UserUpdateDto): Promise<User | null> {
    const { data } = await api.patch<ApiResponse<User>>("/users/me", updateData);
    return data.data;
  },

  // old methods
  // async update(id: string, updateData: Pick<User, "username"> & { avatar_url: string | null }) {
  //   return supabase.from("profiles").update(updateData).eq("id", id).select().single();
  // },
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
