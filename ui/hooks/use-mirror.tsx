import { useEffect, useState } from "react";

type DisplayType = "sm" | "md" | "lg" | "xl" | "2xl";

const useMirror = (): DisplayType => {
  const [displayType, setDisplayType] = useState<DisplayType>("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDisplayType("sm");
      } else if (width >= 768 && width < 1024) {
        setDisplayType("md");
      } else if (width >= 1024 && width < 1920) {
        setDisplayType("lg");
      } else if (width >= 1920 && width < 2560) {
        setDisplayType("xl");
      } else {
        setDisplayType("2xl");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return displayType;
};

export default useMirror;
