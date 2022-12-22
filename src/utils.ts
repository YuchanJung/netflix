export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function returnRatioOfBannerHeightToWidth(
  imagePath: string | undefined
) {
  if (!imagePath) return 100;
  const img = new Image();
  img.src = imagePath;
  return (img.height * 100) / img.width;
}
