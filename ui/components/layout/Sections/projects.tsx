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

const ProjectsSection = () => {
  return (
    <section id="projects" className="mx-auto max-w-7xl md:h-[130vh]">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text pt-16 text-center text-4xl text-transparent md:text-7xl",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-opacity-50 mb-32 dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20",
          )}
        >
          Projects
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.map((project, index) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </section>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="group/modal-btn flex justify-center bg-transparent">
          <div
            className="relative h-auto w-[400px] overflow-hidden rounded-lg"
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="absolute top-0 left-0 h-full w-full transition-all hover:scale-[1.05]"
              src={project.src}
              alt={project.title}
              width={300}
              height={300}
            />
            <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black via-black/85 to-transparent">
              <div className="flex h-full flex-col items-start justify-end p-6">
                <div className="text-left text-lg">{project.title}</div>
                <div className="w-fit rounded-lg bg-white px-2 text-xs text-black">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="overflow-auto md:max-h-[80%] md:max-w-4xl">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white">
              Cancel
            </button>
            <Link href={project.live} target="_blank">
              <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
                Visit
              </button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
        {project.title}
      </h4>
      <div className="flex max-w-screen flex-col overflow-hidden md:flex-row md:justify-evenly md:overflow-visible">
        <div className="mb-8 flex flex-row items-center justify-center gap-2 text-3xl md:flex-col-reverse">
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="mb-8 flex flex-row items-center justify-center gap-2 text-3xl md:flex-col-reverse">
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {/* <div className="flex justify-center items-center">
        {project.screenshots.map((image, idx) => (
          <motion.div
            key={"images" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={`${project.src.split("1.png")[0]}${image}`}
              alt="screenshots"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div> */}
      {project.content}
    </>
  );
};
