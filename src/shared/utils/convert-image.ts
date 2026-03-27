export async function convertToWebp(file: File, maxWidth: number = 100): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const MAX_WIDTH = maxWidth;

  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const targetWidth = Math.round(bitmap.width * scale);
  const targetHeight = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/webp", 0.85));

  return new File([blob], "image.webp", {
    type: "image/webp",
  });
}
