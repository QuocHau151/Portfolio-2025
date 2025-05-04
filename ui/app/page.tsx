"use client";

import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import CircleDev from "@/components/layout/Home/CircleDev";
import Hero from "@/components/layout/Home/Hero";
import Process from "@/components/layout/Home/Process";
import Project from "@/components/layout/Home/Project";
import Stack from "@/components/layout/Home/Stack";

export default function Home() {
  return (
    <div className="mt-20 md:mt-[140px] lg:mt-20 xl:mt-[50px]">
      <Header />
      <Hero />
      <CircleDev />
      <Stack />
      <Project />
      <Process />
      <Footer />
    </div>
  );
}
