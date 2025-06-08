import Link from "next/link";

import { BoxReveal } from "@/components/feature/reveal-animations";

const SkillsSection = () => {
  return (
    <section id="skills" className="h-screen w-full md:h-[150dvh]">
      <div className="sticky top-[70px] mb-96">
        <Link href={"#skills"}>
          <BoxReveal width="100%">
            <h2 className="mt-5 bg-gradient-to-tr from-neutral-500 via-neutral-300 to-white bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-6xl">
              SKILLS
            </h2>
          </BoxReveal>
        </Link>
        <p className="mx-auto line-clamp-4 max-w-3xl text-center text-base font-normal text-neutral-600">
          (hint: press a key or hover)
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
