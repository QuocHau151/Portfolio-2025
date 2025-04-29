"use client";
import { MainMenusGradientCard } from "@/components/ui/animatedcard";
import { SpotlightButton } from "@/components/ui/Spotlightbutton";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function Stack() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress: scroll1 } = useScroll({
    target: ref1,
    offset: ["0 0.8", "1 0.5"],
  });

  const { scrollYProgress: scroll2 } = useScroll({
    target: ref2,
    offset: ["0 0.8", "1 0.5"],
  });

  const { scrollYProgress: scroll3 } = useScroll({
    target: ref3,
    offset: ["0 0.8", "1 0.5"],
  });

  const xAnim1 = useTransform(scroll1, [0.7, 0], [0, -500]);
  const xAnim2 = useTransform(scroll2, [0.7, 0], [0, -500]);
  const xAnim3 = useTransform(scroll3, [0.7, 0], [0, -500]);

  // Animation cho mobile (từ dưới lên)
  const yAnim1 = useTransform(scroll1, [0, 0.5], [500, 0]);
  const yAnim2 = useTransform(scroll2, [0, 0.6], [500, 0]);
  const yAnim3 = useTransform(scroll3, [0, 0.7], [500, 0]);

  return (
    <div className="container flex h-[150%] flex-col items-center gap-3 overflow-hidden px-2 py-10 pb-20 md:flex-row md:gap-6">
      <motion.div
        ref={ref1}
        style={{
          [isMobile ? "x" : "y"]: isMobile ? xAnim1 : yAnim1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          restDelta: 0.001,
          duration: 0.5,
        }}
      >
        <MainMenusGradientCard className="flex h-min flex-col items-center justify-center gap-5 bg-gradient-to-b from-gray-800 to-black px-10 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-12 place-content-center rounded-full bg-white text-black"></div>
            <h1 className="text-[20px] font-medium">Front End</h1>
          </div>
          <h2 className="text-justify text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
            minus explicabo animi numquam, vel soluta voluptas accusamus eveniet
            quis magni necessitatibus commodi labore laborum eaque nobis alias!
            Nihil, labore.
          </h2>
          <SpotlightButton className="mt-4 text-[13px]" text="Lear More" />
        </MainMenusGradientCard>
      </motion.div>
      <motion.div
        ref={ref2}
        style={{
          [isMobile ? "x" : "y"]: isMobile ? xAnim2 : yAnim2,
        }}
      >
        <MainMenusGradientCard className="flex h-min flex-col items-center justify-center gap-5 bg-gradient-to-b from-gray-800 to-black px-10 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-12 place-content-center rounded-full bg-white text-black"></div>
            <h1 className="text-[20px] font-medium">Back End</h1>
          </div>
          <h2 className="text-justify text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
            minus explicabo animi numquam, vel soluta voluptas accusamus eveniet
            quis magni necessitatibus commodi labore laborum eaque nobis alias!
            Nihil, labore.
          </h2>
          <SpotlightButton className="mt-4 text-[13px]" text="Lear More" />
        </MainMenusGradientCard>
      </motion.div>
      <motion.div
        ref={ref3}
        style={{
          [isMobile ? "x" : "y"]: isMobile ? xAnim3 : yAnim3,
        }}
      >
        <MainMenusGradientCard className="flex h-min flex-col items-center justify-center gap-5 bg-gradient-to-b from-gray-800 to-black px-10 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-12 place-content-center rounded-full bg-white text-black"></div>
            <h1 className="text-[20px] font-medium">DevOps</h1>
          </div>
          <h2 className="text-justify text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
            minus explicabo animi numquam, vel soluta voluptas accusamus eveniet
            quis magni necessitatibus commodi labore laborum eaque nobis alias!
            Nihil, labore.
          </h2>
          <SpotlightButton className="mt-4 text-[13px]" text="Lear More" />
        </MainMenusGradientCard>
      </motion.div>
    </div>
  );
}
