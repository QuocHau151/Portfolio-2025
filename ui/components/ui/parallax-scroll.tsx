/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/libs/utils";
import Fancybox from "./Fancybox";

export const ParallaxGallery = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // Sử dụng state để lưu thông tin về hướng của ảnh
  const [imageOrientations, setImageOrientations] = useState<
    Record<string, string>
  >({});

  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Phát hiện hướng của ảnh (ngang/dọc)
  useEffect(() => {
    const checkOrientation = async () => {
      const orientations: Record<string, string> = {};

      await Promise.all(
        images.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              const ratio = img.width / img.height;
              if (ratio > 1.2) {
                orientations[src] = "landscape";
              } else if (ratio < 0.8) {
                orientations[src] = "portrait";
              } else {
                orientations[src] = "square";
              }
              resolve();
            };
            img.onerror = () => {
              orientations[src] = "landscape"; // Mặc định nếu không load được
              resolve();
            };
            img.src = src;
          });
        }),
      );

      setImageOrientations(orientations);
    };

    checkOrientation();
  }, [images]);

  // Phân phối ảnh ngang dọc một cách hợp lý vào 3 cột
  const distributeImages = () => {
    // Tạo mảng trống để chứa các ảnh đã được phân loại
    const landscapes: string[] = [];
    const portraits: string[] = [];
    const squares: string[] = [];

    // Phân loại ảnh
    images.forEach((src) => {
      const orientation = imageOrientations[src];
      if (orientation === "landscape") {
        landscapes.push(src);
      } else if (orientation === "portrait") {
        portraits.push(src);
      } else {
        squares.push(src);
      }
    });

    // Tạo 3 cột với tỉ lệ cân bằng
    const columns: string[][] = [[], [], []];

    // Phân phối ảnh ngang trước
    landscapes.forEach((src, index) => {
      columns[index % 3]?.push(src);
    });

    // Sau đó là ảnh vuông
    squares.forEach((src) => {
      // Tìm cột ngắn nhất để thêm vào
      const shortestColumnIndex = columns
        .map((col) => col.length)
        .indexOf(Math.min(...columns.map((col) => col.length)));
      columns[shortestColumnIndex]?.push(src);
    });

    // Cuối cùng là ảnh dọc
    portraits.forEach((src) => {
      const shortestColumnIndex = columns
        .map((col) => col.length)
        .indexOf(Math.min(...columns.map((col) => col.length)));
      columns[shortestColumnIndex]?.push(src);
    });

    return columns;
  };

  const columns = distributeImages();

  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: true,
        },
      }}
    >
      <div
        className={cn(
          "min-h-screen w-full items-start overflow-y-auto py-12",
          className,
        )}
        ref={gridRef}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div className="grid gap-6" key={`column-${columnIndex}`}>
              {column.map((src, imgIndex) => {
                const orientation = imageOrientations[src] || "landscape";
                return (
                  <motion.div
                    style={{
                      y:
                        columnIndex === 0
                          ? translateFirst
                          : columnIndex === 1
                            ? translateSecond
                            : translateThird,
                    }}
                    key={`${columnIndex}-${imgIndex}`}
                    className={cn(
                      "overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl",
                      orientation === "portrait"
                        ? "aspect-[3/4]"
                        : orientation === "landscape"
                          ? "aspect-[16/9]"
                          : "aspect-square",
                    )}
                  >
                    <Image
                      data-fancybox="gallery"
                      src={src}
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-700 hover:scale-110",
                      )}
                      height={orientation === "portrait" ? 800 : 500}
                      width={orientation === "portrait" ? 600 : 800}
                      alt={`Gallery image ${columnIndex * 100 + imgIndex}`}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Fancybox>
  );
};
