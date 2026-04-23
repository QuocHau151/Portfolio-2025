"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";
import Link from "next/link";

import SmoothScroll from "@/components/feature/smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/libs/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="container relative mx-auto py-24 md:py-32">
      <div className="mb-16 text-center md:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase backdrop-blur-sm"
        >
          Portfolio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl"
        >
          <span className="text-gradient">Dự án đã thực hiện</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-muted"
        >
          Một số dự án tiêu biểu tôi đã phát triển cho khách hàng doanh nghiệp và
          cá nhân trong vai trò Fullstack Developer & Freelancer.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated transition-all duration-500 hover:border-white/10 hover:shadow-2xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <Modal>
        <ModalTrigger className="block w-full text-left">
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              <Image
                src={project.src}
                alt={project.title}
                fill
                className="object-cover object-[50%_0%] transition-all duration-[3000ms] ease-linear group-hover:object-[50%_100%] group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            {/* Glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 100%, rgba(40,236,141,0.08), transparent 60%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {project.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary md:text-xl">
              {project.title}
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Xem chi tiết</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </ModalTrigger>

        <ModalBody className="md:max-h-[85%] md:max-w-3xl">
          <ModalContent>
            <SmoothScroll isInsideModal={true}>
              <ProjectDetail project={project} />
            </SmoothScroll>
          </ModalContent>
          <ModalFooter className="gap-3 border-t border-white/5 bg-surface">
            <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
              Đóng
            </button>
            <Link href={project.live} target="_blank" rel="noopener noreferrer">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Truy cập website
              </button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </motion.div>
  );
};

export default ProjectsSection;

const ProjectDetail = ({ project }: { project: Project }) => {
  return (
    <div className="space-y-8">
      {/* Header image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5">
        <Image
          src={project.src}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white md:text-3xl">
          {project.title}
        </h3>
        <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>
      </div>

      {/* Tech stack */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Công nghệ sử dụng
        </h4>
        <div className="flex flex-wrap gap-6">
          {project.skills.frontend && project.skills.frontend.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Frontend</p>
              <FloatingDock items={project.skills.frontend} />
            </div>
          )}
          {project.skills.backend && project.skills.backend.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Backend</p>
              <FloatingDock items={project.skills.backend} />
            </div>
          )}
          {project.skills.devops && project.skills.devops.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">DevOps</p>
              <FloatingDock items={project.skills.devops} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none text-sm leading-relaxed text-muted md:text-base">
        {project.content}
      </div>
    </div>
  );
};
