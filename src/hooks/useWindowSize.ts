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
  const [windowSize, setWindowSize] = useState<Size>({
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
  });
  const handleResize = () => {
    setWindowSize({
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight,
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
