"use client";
import { ButtonEffect } from "@/components/ui/moving-border";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icons } from "@/data/icon-tech";
import useMirror from "@/hooks/use-mirror";
import {
  motion,
  useAnimationFrame,
  useScroll,
  useTransform,
} from "framer-motion";

import React, { useRef } from "react";

export default function CircleDev() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref2,
  });

  const scaleAnim = useTransform(scrollYProgress, [1, 0], [0, 1]);

  useAnimationFrame((time) => {
    if (ref.current) {
      const x = Math.sin(time * 0.003) * 20; // Horizontal movement
      const y = Math.cos(time * 0.004) * 15; // Vertical movement
      const rotate = Math.sin(time * 0.003) * 10; // Rotation

      ref.current.style.transform = `
          translate(${x}px, ${y}px) 
          rotateY(${rotate}deg)
        `;
    }
  });
  const mirror = useMirror();
  let height = "h-[450px]";
  switch (mirror) {
    case "sm":
      height = "h-[450px]";
      break;
    case "md":
      height = "h-[1000px]";
      break;
    case "lg":
      height = "h-[750px]";
      break;
    case "xl":
      height = "h-[900px]";
      break;
    case "2xl":
      height = "h-[1000px]";
      break;
  }
  const buttons = [
    "Thiết Kế Website",
    "Thiết Kế UX/UI",
    "Thiết Kế Database",
    "Deploy Website",
  ];
  return (
    <div className="relative container mx-auto overflow-hidden py-10">
      <div ref={ref2} className="relative mx-auto w-min overflow-hidden">
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            duration: 2, // Thời gian animation (đi qua từ trái qua phải)
            repeat: Infinity, // Lặp lại vô hạn
            ease: "linear", // Hiệu ứng chuyển động đều
          }}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)",
            mixBlendMode: "overlay",
          }}
        />
        <motion.h1
          style={{
            scale: scaleAnim,
          }}
          className="bg-transparent text-center text-[50px] font-extrabold text-white md:text-[150px]"
        >
          FULLSTACKDEV
        </motion.h1>
      </div>
      <motion.div
        initial={{
          scale: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
        }}
        style={{
          scale: scaleAnim,
        }}
        className={`relative flex ${height} w-full flex-col items-center justify-center`}
      >
        <OrbitingCircles
          iconSize={
            mirror === "sm"
              ? 20 // mobile
              : mirror === "md"
                ? 40 // tablet
                : mirror === "lg"
                  ? 30 // laptop
                  : mirror === "xl"
                    ? 40 // desktop24
                    : 40 // desktop27+ (xl and larger)
          }
          radius={
            mirror === "sm"
              ? 50 // mobile
              : mirror === "md"
                ? 150 // tablet
                : mirror === "lg"
                  ? 110 // laptop
                  : mirror === "xl"
                    ? 100 // desktop24
                    : 150 // desktop27+ (xl and larger)
          }
          speed={1}
        >
          <Icons.html />
          <Icons.css />
          <Icons.javascript />
          <Icons.typescript />
        </OrbitingCircles>
        <OrbitingCircles
          iconSize={
            mirror === "sm"
              ? 30 // mobile
              : mirror === "md"
                ? 50 // tablet
                : mirror === "lg"
                  ? 40 // laptop
                  : mirror === "xl"
                    ? 50 // desktop24
                    : 50 // desktop27+ (xl and larger)
          }
          radius={
            mirror === "sm"
              ? 100 // mobile
              : mirror === "md"
                ? 250 // tablet
                : mirror === "lg"
                  ? 190 // laptop
                  : mirror === "xl"
                    ? 200 // desktop24
                    : 250 // desktop27+ (xl and larger)
          }
          reverse
          speed={2}
        >
          <Icons.reactjs />
          <Icons.nextjs />
          <Icons.nodejs />
          <Icons.nestjs />
        </OrbitingCircles>
        <OrbitingCircles
          iconSize={
            mirror === "sm"
              ? 40 // mobile
              : mirror === "md"
                ? 60 // tablet
                : mirror === "lg"
                  ? 50 // laptop
                  : mirror === "xl"
                    ? 60 // desktop24
                    : 60 // desktop27+ (xl and larger)
          }
          radius={
            mirror === "sm"
              ? 150 // mobile
              : mirror === "md"
                ? 350 // tablet
                : mirror === "lg"
                  ? 270 // laptop
                  : mirror === "xl"
                    ? 300 // desktop24
                    : 350 // desktop27+ (xl and larger)
          }
          speed={3}
        >
          <Icons.mongodb />
          <Icons.postgresql />
          <Icons.docker />
        </OrbitingCircles>
        <OrbitingCircles
          iconSize={
            mirror === "sm"
              ? 50 // mobile
              : mirror === "md"
                ? 70 // tablet
                : mirror === "lg"
                  ? 60 // laptop
                  : mirror === "xl"
                    ? 70 // desktop24
                    : 70 // desktop27+ (xl and larger)
          }
          radius={
            mirror === "sm"
              ? 200 // mobile
              : mirror === "md"
                ? 450 // tablet
                : mirror === "lg"
                  ? 350 // laptop
                  : mirror === "xl"
                    ? 400 // desktop24
                    : 450 // desktop27+ (xl and larger)
          }
          speed={3}
          reverse
        >
          <Icons.prisma />
          <Icons.shadcnui />
          <Icons.supabase />
          <Icons.tailwind />
          <Icons.postman />
        </OrbitingCircles>
        <div ref={ref} className="invisible absolute inset-0 lg:visible">
          {buttons.map((text, index) => {
            // Calculate position based on index
            const position = {
              0: "top-[10%] left-[10%]", // Top Left
              1: "top-[10%] right-[10%]", // Top Right
              2: "bottom-[10%] left-[10%]", // Bottom Left
              3: "bottom-[10%] right-[10%]", // Bottom Right
            }[index];

            return (
              <motion.div key={text} className={`absolute ${position}`}>
                <ButtonEffect
                  width="w-[200px]"
                  height="h-[50px]"
                  className="font-bold text-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  {text}
                </ButtonEffect>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
