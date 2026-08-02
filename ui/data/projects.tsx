import SlideShow from "@/components/feature/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaUbuntu } from "react-icons/fa";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiPm2,
  SiPortainer,
  SiPostgresql,
  SiPrisma,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="my-3 mb-8 flex flex-col items-center justify-start gap-3 md:flex-row">
      <Link
        className="flex gap-2 font-mono no-underline"
        rel="noopener noreferrer"
        target="_blank"
        href={live}
      >
        <Button
          variant="default"
          size="sm"
          className="bg-primary text-black hover:bg-primary/90"
        >
          Visit website
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="flex gap-2 font-mono no-underline"
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-white hover:bg-white/5 hover:text-white"
          >
            Source code
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },

  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },

  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },

  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },

  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },

  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5 />,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3 />,
  },
  pm2: {
    title: "PM2",
    bg: "black",
    fg: "white",
    icon: <SiPm2 />,
  },
  ubuntu: {
    title: "Ubuntu",
    bg: "black",
    fg: "white",
    icon: <FaUbuntu />,
  },
  portainer: {
    title: "Portainer",
    bg: "black",
    fg: "white",
    icon: <SiPortainer />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[]; devops: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "1",
    category: "Fullstack Dev ",
    title: "FPT SmartHome",
    src: "/assets/images/projects/fpt/fpt.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://fpt-smarthome.vn/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.next, PROJECT_SKILLS.mongo, PROJECT_SKILLS.node],
      devops: [
        PROJECT_SKILLS.ubuntu,
        PROJECT_SKILLS.portainer,
        PROJECT_SKILLS.pm2,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-[15px]">
            FPT SmartHome was a project I worked on during my internship as a
            web developer. It is a satellite website that helps users explore
            product information, reviews and experiences with FPT smart-home
            devices.
          </TypographyP>
          <div className="py-4 font-mono">
            Key capabilities: <br />
            <ul className="ml-8 list-disc text-[15px]">
              <li>
                Login, registration, OAuth, password recovery and email verification
              </li>
              <li>Product, order, checkout and search management</li>
              <li>
                User, role, permission, analytics and reporting management
              </li>
            </ul>
          </div>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`/assets/images/projects/fpt/1.jpg`]} />
        </div>
      );
    },
  },
  {
    id: "2",
    category: "Fullstack Dev ",
    title: "Khang Minh Lighting",
    src: "/assets/images/projects/khangminh/khangminh.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://khangminhlighting.com/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.vite,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.supabase,
      ],
      devops: [
        PROJECT_SKILLS.ubuntu,
        PROJECT_SKILLS.portainer,
        PROJECT_SKILLS.pm2,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Khang Minh Lighting is an e-commerce website I built as a full-stack
            developer. Users can discover products, place orders and pay online.
            I worked across the interface, backend and SEO optimization.
          </TypographyP>
          <div className="py-4 font-mono">
            Key capabilities: <br />
            <ul className="ml-8 list-disc text-[15px]">
              <li>
                Login, registration, OAuth, password recovery and email verification
              </li>
              <li>Product, order, checkout and search management</li>
              <li>
                User, role, permission, analytics and reporting management
              </li>
            </ul>
          </div>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[]} />
        </div>
      );
    },
  },
  {
    id: "3",
    category: "Fullstack Dev ",
    title: "Khue Tuan",
    src: "/assets/images/projects/khuetuan/khuetuan.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://khuetuan.com/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.vite,
      ],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.node],
      devops: [
        PROJECT_SKILLS.ubuntu,
        PROJECT_SKILLS.portainer,
        PROJECT_SKILLS.pm2,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            khuatuan.com is a full-stack system I built while developing web
            products.
          </TypographyP>
          <div className="py-4 font-mono">
            Key capabilities: <br />
            <ul className="ml-8 list-disc text-[15px]">
              <li>
                Login, registration, OAuth, password recovery and email verification
              </li>
              <li>Product, order, checkout and search management</li>
              <li>
                User, role, permission, analytics and reporting management
              </li>
            </ul>
          </div>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[]} />
        </div>
      );
    },
  },
  {
    id: "4",
    category: "Fullstack Dev ",
    title: "MepSharing",
    src: "/assets/images/projects/mepsharing/mepsharing.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://mepsharing.com/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.vite,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
      devops: [
        PROJECT_SKILLS.ubuntu,
        PROJECT_SKILLS.portainer,
        PROJECT_SKILLS.pm2,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            mepsharing.com is a full-stack system I built for document sharing
            and online content operations.
          </TypographyP>
          <div className="py-4 font-mono">
            Key capabilities: <br />
            <ul className="ml-8 list-disc text-[15px]">
              <li>
                Login, registration, OAuth, password recovery and email verification
              </li>
              <li>Product, order, checkout and search management</li>
              <li>
                User, role, permission, analytics and reporting management
              </li>
            </ul>
          </div>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[]} />
        </div>
      );
    },
  },
  {
    id: "5",
    category: "Fullstack Dev ",
    title: "Lam Dong Yearbook · Sol Media",
    src: "/assets/images/projects/sol/sol.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://solmedia.pics/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.vite,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
      devops: [
        PROJECT_SKILLS.ubuntu,
        PROJECT_SKILLS.portainer,
        PROJECT_SKILLS.pm2,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            solmedia.pics is a full-stack system I built for managing and
            sharing images online.
          </TypographyP>
          <div className="py-4 font-mono">
            Key capabilities: <br />
            <ul className="ml-8 list-disc text-[15px]">
              <li>
                Login, registration, OAuth, password recovery and email verification
              </li>
              <li>Product, order, checkout and search management</li>
              <li>
                User, role, permission, analytics and reporting management
              </li>
            </ul>
          </div>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[]} />
        </div>
      );
    },
  },
  {
    id: "6",
    category: "Designer ",
    title: "Nam An Vi",
    src: "/assets/images/projects/namanvi/namanvi.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://namavi.vn/",
    github: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.vite,
      ],
      backend: [],
      devops: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            namanvi.vn is a case study in web experience and interface design,
            completed together with a design team.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[]} />
        </div>
      );
    },
  },
];
export default projects;
