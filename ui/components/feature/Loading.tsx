import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  // Size variants

  // Animation variants
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        className={`border-t-primary size-10 rounded-full border-4`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      <motion.div
        className={`absolute rounded-full border-4 border-t-transparent opacity-30`}
        animate={{
          rotate: [0, 720],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loading;
