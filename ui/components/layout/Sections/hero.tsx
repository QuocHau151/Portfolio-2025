import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BlurIn, BoxReveal } from "@/components/feature/reveal-animations";
import ScrollDownIcon from "@/components/feature/scroll-down-icon";
import { usePreloader } from "@/components/layout/preloader";

import { cn } from "@/libs/utils";
import { File } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative h-screen w-full")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "z-[2] h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)]",
            "col-span-1",
            "flex flex-col items-center justify-start md:items-start md:justify-center",
            "pt-20 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48",
          )}
        >
          {!isLoading && (
            <>
              <div className="space-y-2">
                <BlurIn delay={0.7}>
                  <p className={"text-lg font-bold"}>
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>
                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <p className={"text-left text-6xl font-bold"}>Quốc Hậu</p>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      theres something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p className={"text-primary text-2xl font-bold"}>
                    Fullstack Developer
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex flex-col gap-3 md:ml-2">
                <Link href="/" target="_blank" className="flex-1">
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex w-full items-center gap-2">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="flex gap-3 md:self-start">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href="#contact">
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <Link href={""} target="_blank">
                    <Button variant={"outline"}>
                      <SiGithub size={24} />
                    </Button>
                  </Link>
                  <Link href={""} target="_blank">
                    <Button variant={"outline"}>
                      <SiLinkedin size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-span-1 grid"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
