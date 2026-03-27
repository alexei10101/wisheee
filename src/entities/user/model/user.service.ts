import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { userRepository } from "../api/user.repository";
import { convertToWebp } from "@/shared/utils/convert-image";

export const userService = {
  async uploadAvatar(userId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
    const webpFile = await convertToWebp(file, 160);
    const filePath = `${userId}/avatar/avatar.webp`;

    const { error: uploadError } = await safeQuery(userRepository.uploadAvatar(webpFile, filePath));
    if (uploadError) return { result: null, error: uploadError };

    const { data } = userRepository.getPublicUrl(filePath);

    return {
      result: data,
      error: null,
    };
  },
  async removeAvatar(userId: string) {
    const path = `${userId}/avatar/avatar.webp`;
    const { error } = await userRepository.removeAvatar(path);

    return { result: null, error };
  },
};
