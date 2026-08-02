"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { SpotlightButton } from "@/components/ui/Spotlightbutton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative z-10 container mx-auto mt-[100px] flex min-h-[calc(100vh-100px)] flex-col items-start justify-center lg:flex-row lg:items-center lg:justify-start">
      <div className="l flex flex-col items-center justify-center lg:w-1/2 lg:items-start lg:justify-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-3 px-4 font-mono text-xs tracking-[0.18em] text-primary uppercase"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Personal workspace / 2025
        </motion.div>
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
            className="mx-auto px-4 text-center text-[30px] leading-[1.28] font-extrabold md:text-4xl lg:text-left lg:text-5xl xl:text-6xl 2xl:text-6xl"
          >
            <Highlight className="mx-1 my-1 px-3 text-primary">Hello</Highlight>{" "}
            I&apos;m Quoc Hau {" "}
            <Highlight className="mx-1 my-1 text-primary">End-to-End Builder</Highlight>{" "}
            <Highlight className="mx-1 my-1 text-primary">Web App</Highlight>{" "}
            turning ideas into products
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
          className="flex flex-wrap gap-3 px-4"
        >
          <Link href="#projects">
            <SpotlightButton className="mt-4" text="Explore my work" />
          </Link>
          <Link
            href="#about"
            className="mt-4 inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            About me
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
