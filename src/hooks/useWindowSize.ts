import { useState, useEffect } from "react";
// Define general type for useWindowSize hook, which includes width and height
interface Size {
  windowInnerWidth: number;
  windowInnerHeight: number;
}

// Hook
export function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  // replace "window.innerWidth" with "document.documentElement.clientWidth" to not count scrollbar size
  const [windowSize, setWindowSize] = useState<Size>({
    windowInnerWidth: document.documentElement.clientWidth,
    windowInnerHeight: document.documentElement.clientHeight,
  });

  const handleResize = () => {
    setWindowSize({
      windowInnerWidth: document.documentElement.clientWidth,
      windowInnerHeight: document.documentElement.clientHeight,
    });
  };
  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
