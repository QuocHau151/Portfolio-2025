"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollLinked() {
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? 5 : 10,
          originX: 0,
          backgroundColor: "#ff0088",
          zIndex: 9999,
        }}
      />
    </>
  );
}
