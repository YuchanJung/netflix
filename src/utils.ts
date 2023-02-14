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

export function returnSliderInfo(offset: number, windowInnerWidth: number) {
  const ratioOfSliderContentWidthToWindow = 0.92 / (offset * 1.03 + 0.03);
  const sliderContentWidth =
    windowInnerWidth * ratioOfSliderContentWidthToWindow;
  const sliderContentHeight = sliderContentWidth * 0.58;
  const gapWidth = sliderContentWidth * 0.03;
  return { sliderContentWidth, sliderContentHeight, gapWidth };
}
