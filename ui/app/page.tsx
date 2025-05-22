"use client";

import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import CircleDev from "@/components/layout/Home/CircleDev";
import Hero from "@/components/layout/Home/Hero";
import Project from "@/components/layout/Home/Project";
import Stack from "@/components/layout/Home/Stack";
import ScrollLinked from "@/components/ui/scroll-linked";

export default function Home() {
  return (
    <div className="mt-20 md:mt-[140px] lg:mt-20 xl:mt-[50px]">
      <ScrollLinked />
      <Header />
      <Hero />
      <CircleDev />
      <Stack />
      <Project />
      <Footer />
    </div>
  );
}
