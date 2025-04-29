"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./button";
import { SpotlightButton } from "./Spotlightbutton";

interface CardProps {
  i: number;
  title: string;
  description: string;
  tag: string[];
  src: string;
  url: string;

  progress: any;
  range: number[];
  targetScale: number;
}

export const StackCard: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  tag,
  url,

  progress,
  range,
  targetScale,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  // Scroll context cho ảnh nội bộ card
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "start start"],
  });
  const isMobile = useIsMobile();
  const imageScale = useTransform(cardScrollProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const [isHovering, setIsHovering] = useState(false);
  const transitionDuration = isMobile ? "20s" : "15s";

  return (
    <div
      ref={cardContainerRef}
      className="sticky top-0 container flex h-min w-full items-center justify-center px-2 md:h-[850px] lg:h-[950px] xl:h-[1150px] xl:px-[200px] 2xl:h-[1500px]"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${isMobile ? "12vh" : "-5vh"} + ${i * 25}px)`,
        }}
        className="relative mb-10 flex h-full w-full origin-top flex-col-reverse gap-y-4 rounded-3xl border border-white bg-black px-2 py-2 md:mb-5 md:h-[500px] md:flex-row md:justify-between md:gap-10 md:border-none md:bg-transparent md:pl-20 lg:h-[650px] xl:h-[800px] 2xl:h-[1000px]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-black md:items-start md:gap-4">
          <h1 className="text-[25px] font-bold md:text-[40px]">{title}</h1>
          <div className="flex w-full flex-wrap items-center justify-center gap-2 px-6 md:justify-start md:px-0">
            {tag.map((item, index) => (
              <span
                key={index}
                className="mr-2 rounded-full bg-white px-4 py-1 text-[10px] font-medium whitespace-nowrap text-black md:text-[16px]"
              >
                {item}
              </span>
            ))}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="line-clamp-3 px-4 text-justify text-[14px] font-light md:line-clamp-[10] md:px-0 md:text-[16px]"
          />
          <Link href={url} target="_blank" className="mb-3">
            <SpotlightButton className="text-[12px]" text="Xem Web" />
          </Link>
        </div>
        <div className="h-[300px] w-full overflow-hidden rounded-3xl border-white md:h-full md:border lg:w-full xl:max-w-[800px]">
          <motion.div className="h-full w-full" style={{ scale: imageScale }}>
            <motion.div
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-3xl"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <Image
                src={src}
                alt="image"
                fill
                className={`rounded-3xl object-cover ${
                  isHovering ? "object-bottom" : "object-top"
                }`}
                style={{
                  transition: `object-position ${transitionDuration} linear`,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
