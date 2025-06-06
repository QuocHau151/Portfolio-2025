"use client";

import AnimatedBackground from "@/components/feature/animated-background";
import SmoothScroll from "@/components/feature/smooth-scroll";
import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import HeroSection from "@/components/layout/Sections/hero";
import ProjectsSection from "@/components/layout/Sections/projects";
import SkillsSection from "@/components/layout/Sections/skills";
import ScrollLinked from "@/components/ui/scroll-linked";

export default function Home() {
  return (
    <SmoothScroll>
      <main className={""}>
        <ScrollLinked />
        <Header />
        <div className="fixed top-0 z-0 h-screen w-full">
          <AnimatedBackground />
        </div>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        {/* contact section */}
        <Footer />
      </main>
      {/* <div className="mt-20 md:mt-[140px] lg:mt-20 xl:mt-[50px]">
        <Hero />
      <CircleDev />
      <Stack />
      <Project />
      </div> */}
    </SmoothScroll>
  );
}
