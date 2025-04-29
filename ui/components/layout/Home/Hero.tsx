"use client";

import { CobeDraggableAuto } from "@/components/ui/cobeglobeautodraggable";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SpotlightButton } from "@/components/ui/Spotlightbutton";
import { motion } from "framer-motion";
import React from "react";

export default function Hero() {
  return (
    <div className="relative container mx-auto flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-start">
      <div className="flex flex-col items-center justify-center lg:w-[110%] lg:items-start lg:justify-start xl:w-[85%] 2xl:w-[80%]">
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="mx-auto px-4 text-center text-[30px] leading-relaxed font-bold md:text-4xl lg:text-left lg:text-5xl lg:leading-snug xl:text-6xl 2xl:text-7xl"
          >
            <Highlight className="mr-2 pl-3 text-black"> Hello </Highlight> I’m
            A Global Freelance{" "}
            <Highlight className="mr-2 pl-3 text-black"> Web, App </Highlight>{" "}
            Developer All In JavaScript
          </motion.h1>
        </HeroHighlight>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="px-4"
        >
          <SpotlightButton className="mt-4" text="Contact Me" />
        </motion.div>
      </div>

      <div className="relative z-10 h-[400px] w-full overflow-hidden rounded-lg md:h-[930px] lg:h-[630px] xl:h-[860px] 2xl:h-[1100px]">
        <CobeDraggableAuto />
      </div>
    </div>
  );
}
