/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
"use client";
import { cn } from "@/libs/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      {/* <FloatingDockMobile items={items} className={mobileClassName} /> */}
    </>
  );
};

export const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; link: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full w-full bg-transparent pb-1"
          >
            <div className="mx-3 mx-auto flex w-min items-center justify-center gap-2 rounded-2xl bg-neutral-800 px-4 py-2">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Link
                    href={item.link}
                    key={item.title}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button> */}
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const [showHint, setShowHint] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  useEffect(() => {
    if (showHint) {
      controls.start({
        opacity: [0, 1, 1, 0],
        x: [-50, -50, 50, 50],
        transition: {
          duration: 2,
          repeatDelay: 2,
          delay: 2,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      controls.stop();
    }
    return () => {
      controls.stop();
      clearInterval(timer.current as NodeJS.Timeout);
    };
  }, [showHint]);
  return (
    <div className="relative flex h-fit items-center justify-center">
      <motion.div
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          setShowHint(false);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          // "hidden md:flex",
          "flex gap-2 md:gap-4",
          "mx-auto h-16 items-end rounded-2xl bg-gray-50 px-4 pb-3 dark:bg-neutral-900",
          // "blur-sm brightness-50",
          className,
        )}
      >
        {items.map((item, index) => (
          <IconContainer mouseX={mouseX} key={index} {...item} />
        ))}
      </motion.div>
      {showHint && (
        <div
          className="t-0 pointer-events-none absolute z-10 h-full w-full"
          onMouseEnter={() => setShowHint(false)}
        >
          <div
            className={cn(
              "relative flex h-full w-full items-center justify-center",
              // "backdrop-blur-md"
            )}
          >
            <motion.div
              className={cn(
                "top-0 left-[50%] h-5 w-5 rounded-full border-2 border-black dark:border-white",
                "translate-x-[-50px]",
              )}
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
            ></motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
