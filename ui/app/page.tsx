"use client";

import AnimatedBackground from "@/components/feature/animated-background";
import SmoothScroll from "@/components/feature/smooth-scroll";
import Dock from "@/components/layout/Dock/page";
import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import ContactSection from "@/components/layout/Home/contact";
import HeroSection from "@/components/layout/Home/hero-section";
import ProjectsSection from "@/components/layout/Home/projects";
import SkillsSection from "@/components/layout/Home/skills";
import ScrollLinked from "@/components/ui/scroll-linked";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <ScrollLinked />
        <Header />
        <div className="fixed top-0 z-0 h-screen w-full">
          <AnimatedBackground />
        </div>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <Dock />
      </main>
    </SmoothScroll>
  );
}
