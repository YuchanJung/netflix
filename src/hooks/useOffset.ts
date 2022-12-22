import { useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

function returnOffsetByWindowInnerWidth(windowInnerWidth: number) {
  // change offset responsively
  let offset = 6;
  if (windowInnerWidth < 1385) offset = 5;
  if (windowInnerWidth < 1085) offset = 4;
  if (windowInnerWidth < 785) offset = 3;
  if (windowInnerWidth < 485) offset = 2;
  return offset;
}

export function useOffset() {
  const [offset, setOffset] = useState(6);
  const { windowInnerWidth, windowInnerHeight } = useWindowSize();
  useEffect(() => {
    windowInnerWidth &&
      setOffset(returnOffsetByWindowInnerWidth(windowInnerWidth));
  }, [windowInnerWidth]);
  return offset;
}
