import { safeQuery, type ServiceResult } from "@/shared/api/safe-query";
import { userRepository } from "../api/user.repository";

export const userService = {
  async uploadAvatar(userId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await safeQuery(userRepository.uploadAvatar(file, filePath));
    if (uploadError) return { result: null, error: uploadError };

    const { data } = userRepository.getPublicUrl(filePath);

    return {
      result: data,
      error: null,
    };
  },
};