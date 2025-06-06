import Link from "next/link";

import { BoxReveal } from "@/components/feature/reveal-animations";

const SkillsSection = () => {
  return (
    <section id="skills" className="h-screen w-full md:h-[150dvh]">
      <div className="sticky top-[70px] mb-96">
        <Link href={"#skills"}>
          <BoxReveal width="100%">
            <h2 className="text-center text-4xl font-bold">SKILLS</h2>
          </BoxReveal>
        </Link>
        <p className="mx-auto mt-4 line-clamp-4 max-w-3xl text-center text-base font-normal text-neutral-300">
          (hint: press a key)
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
