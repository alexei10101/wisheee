import { userRepository } from "../api/user.repository";
import type { User, UserUpdateDto } from "./user";

export const userService = {
  me(): Promise<User | null> {
    return userRepository.me();
  },

  search(query: string): Promise<User[]> {
    return userRepository.search(query);
  },

  getById(id: string): Promise<User | null> {
    return userRepository.getById(id);
  },

  update(data: UserUpdateDto): Promise<User | null> {
    return userRepository.update(data);
  },

  // async uploadAvatar(userId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
  //   const webpFile = await convertToWebp(file, 160);
  //   const filePath = `${userId}/avatar/avatar.webp`;

  //   const { error: uploadError } = await safeQuery(userRepository.uploadAvatar(webpFile, filePath));
  //   if (uploadError) return { result: null, error: uploadError };

  //   const { data } = userRepository.getPublicUrl(filePath);

  //   return {
  //     result: data,
  //     error: null,
  //   };
  // },
  // async removeAvatar(userId: string) {
  //   const path = `${userId}/avatar/avatar.webp`;
  //   const { error } = await userRepository.removeAvatar(path);

  //   return { result: null, error };
  // },
};
