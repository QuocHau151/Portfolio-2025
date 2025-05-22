"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import DropdownAvatar from "@/components/feature/dropdown-avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlignRight } from "lucide-react";
import { BsSearch } from "react-icons/bs";

interface LogoProps {
  theme: string;
  isScroll?: boolean;
  isMobile?: boolean;
}

export const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isScroll, setIsScroll] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-2 z-50 container mx-auto flex items-center justify-center md:top-5"
    >
      <motion.div
        layout
        animate={{
          backdropFilter: isScroll ? "blur(16px)" : "blur(0px)",
          width:
            isScroll && isMobile
              ? "90%"
              : isScroll && !isMobile
                ? "70%"
                : isMobile
                  ? "100%"
                  : "100%",
          backgroundColor: isScroll ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
          boxShadow: isScroll ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
          y: isScroll ? 8 : 0,
          borderRadius: isScroll ? "24px" : "24px",
        }}
        transition={{
          duration: 1,
          ease: [0.23, 1, 0.32, 1], // Improved easing curve
          width: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          },
          x: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          },
          y: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
        className={`flex items-center justify-between gap-8 px-2 py-1`}
      >
        <div className="hidden items-center justify-center gap-8 lg:flex">
          <Link href={"/vps"} className="flex items-center">
            <span className="text-[16px] font-light text-white">VPS</span>
          </Link>
          <Link href={"/proxy"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Proxy</span>
          </Link>
          <Link href={"/proxy"} className="flex items-center">
            <span className="text-[16px] font-light text-white">VPN</span>
          </Link>
          <Link href={"/proxy"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Domain</span>
          </Link>
        </div>
        <Logo theme="dark" isScroll={isScroll} />

        <div className="hidden items-center justify-center gap-8 lg:flex">
          <Link href={"/cv"} className="flex items-center pl-2">
            <span className="text-[16px] font-light text-white">CV</span>
          </Link>
          <Link href={"/components"} className="flex items-center">
            <span className="text-[16px] font-light text-white">
              Components
            </span>
          </Link>
          <Link href={"/blog"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Blog</span>
          </Link>
          <Link href={"/contact"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Contact</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <BsSearch className="text-gray-400" size={20} />
            </SheetTrigger>
            <SheetContent className="bg-black">
              <SheetHeader>
                <SheetTitle>Search</SheetTitle>
              </SheetHeader>
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>

          <DropdownAvatar />
        </div>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <AlignRight />
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ul className="w-full">
              <li className="w-full border-y-2 border-y-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/cv"}>CV</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/product"}>VPS</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/proxy"}>Proxy</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/components"}>Componets</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/blog"}>Blog</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="w-full border-b-2 border-b-gray-600 py-3 text-center text-[15px] font-semibold text-white">
                <Link href={"/login"}>Sign In</Link>
              </li>
            </ul>

            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </motion.div>
    </header>
  );
};
export const Logo: React.FC<LogoProps> = ({ theme, isScroll, isMobile }) => {
  return theme === "dark" ? (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={"/logo/light.png"}
          alt="Logo"
          width={isMobile ? 40 : 50}
          height={isMobile ? 40 : 50}
        />
        {isScroll ? (
          ""
        ) : (
          <span className="text-[20px] font-medium text-white">QuocHau</span>
        )}
      </Link>
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={"/logo/light.png"} alt="Logo" width={30} height={30} />
        {isScroll ? (
          ""
        ) : (
          <span className="text-[20px] font-medium text-white">QuocHau</span>
        )}
      </Link>
    </div>
  );
};
