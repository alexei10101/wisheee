export const wishlistItemService = {
  // async uploadImage(userId: string, wishlistItemId: string, file: File): Promise<ServiceResult<{ publicUrl: string }>> {
  //   const webpFile = await convertToWebp(file);
  //   const filePath = `${userId}/${wishlistItemId}/image.webp`;
  //   const { error: uploadError } = await safeQuery(wishlistItemRepository.uploadImage(webpFile, filePath));
  //   if (uploadError) return { result: null, error: uploadError };
  //   const { data } = wishlistItemRepository.getPublicUrl(filePath);
  //   return {
  //     result: data,
  //     error: null,
  //   };
  // },
  // async removeImage(userId: string, wishlistItemId: string) {
  //   const path = `${userId}/${wishlistItemId}/image.webp`;
  //   const { error } = await wishlistItemRepository.removeImage(path);
  //   return { result: null, error };
  // },
};
