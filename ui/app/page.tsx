"use client";

import CircleDev from "@/components/layout/Home/CircleDev";
import Hero from "@/components/layout/Home/Hero";
import Process from "@/components/layout/Home/Process";
import Project from "@/components/layout/Home/Project";
import Stack from "@/components/layout/Home/Stack";

export default function Home() {
  return (
    <>
      <Hero />
      <CircleDev />
      <Stack />
      <Project />
      <Process />
    </>
  );
}
