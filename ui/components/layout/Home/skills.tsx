import Link from "next/link";

import { BoxReveal } from "@/components/feature/reveal-animations";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 h-screen w-full pointer-events-none md:h-[150dvh]"
    >
      <div className="pointer-events-none sticky top-[70px] mb-96 px-4">
        <Link className="pointer-events-auto" href={"#skills"}>
          <BoxReveal width="100%">
            <h2 className="mt-5 bg-gradient-to-tr from-neutral-500 via-neutral-300 to-white bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-6xl">
              TOOLKIT
            </h2>
          </BoxReveal>
        </Link>
        <p className="mx-auto mt-3 max-w-3xl text-center font-mono text-xs tracking-[0.16em] font-normal text-neutral-500 uppercase">
          Press a key or hover to explore the tools behind my work
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
