import { useEffect, useState } from "react";
import { Size, useWindowSize } from "./useWindowSize";

type currentSize = "sm" | "md" | "lg" | "xl" | "2xl" | null;

const useResponsive = () => {
  const size: Size = useWindowSize();

  const [currentSize, setCurrentSize] = useState<currentSize>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement &&
      size.width
    ) {
      if (size.width >= 0 && size.width < 768) {
        setCurrentSize("sm");
      } else if (size.width >= 768 && size.width < 1024) {
        setCurrentSize("md");
      } else if (size.width >= 1024 && size.width < 1280) {
        setCurrentSize("lg");
      } else if (size.width >= 1280 && size.width < 1536) {
        setCurrentSize("xl");
      } else if (size.width >= 1536) {
        setCurrentSize("2xl");
      }
    }
  }, [size]);

  return currentSize;
};

export default useResponsive;
