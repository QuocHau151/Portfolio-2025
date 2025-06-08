// thoda zada ts ho gya idhar
export enum SkillNames {
  AWS = "aws",
  LINUX = "linux",
  GIT = "git",
  DOCKER = "docker",
  HTML = "html",
  CSS = "css",
  JS = "js",
  POSTGRES = "postgres",
  TS = "ts", //
  REACT = "react", //
  NESTJS = "nestjs", //
  NEXTJS = "nextjs", //
  TAILWIND = "tailwind", //
  NODEJS = "nodejs", //
  EXPRESS = "express", //
  MONGODB = "mongodb", //
  GITHUB = "github", //
  PRETTIER = "prettier", //
  NPM = "npm", //
  SUPABASE = "supabase", //
  PYTHON = "python", //
  NGINX = "nginx", //
  GO = "go", //
  PRISMA = "prisma", //
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "DOM, Closure, Callback, Async/Await, Promise",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription: "	Typing, Interface, Enum, Generics, Type Inference",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "	Semantic Tags, Form, Media, Meta, Accessibility",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "	Flexbox, Grid, Media Query, Animation, Variables",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: `	JSX, Hooks, Components, Props, Context API`,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.NESTJS]: {
    id: 6,
    name: "nestjs",
    label: "NestJS",
    shortDescription:
      "Modules, DI, Controllers, Services, Middleware, Pipes, Guards, Interceptors...",
    color: "#41b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "	SSR, SSG, CSR, API Routes, Server Actions",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "Utility Classes, Responsive, Custom Theme, Dark Mode",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "	Event Loop, HTTP Server, FileSystem, Streams, Modules",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "nestjs",
    label: "NestJS",
    shortDescription: "Middleware, Routing, Controllers, Services, Modules",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Joins, Indexes, Constraints, Transactions, Views, Query Optimization",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Collections, Aggregation, Documents, ObjectId, NoSQL",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription:
      "Version Control, Branching, Merging, Staging, Committing",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription:
      "Github Action, Version Control, Branching, Merging, Staging, Committing",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "Prettier",
    shortDescription: "Code Formatting, Linting, Styling, Consistency",
    color: "#f7b93a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription: "Package Manager, Dependencies, Version Control",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  [SkillNames.SUPABASE]: {
    id: 17,
    name: "supabase",
    label: "Supabase",
    shortDescription:
      "Database, Authentication, Storage, Functions, Realtime, API",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 18,
    name: "python",
    label: "Python",
    shortDescription: "List Comprehension, Pandas, Functions, Modules, Script",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "CLI, Permissions, SSH, Services, Systemd",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription: "	Container, Image, Dockerfile, Volumes, Compose",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "NginX",
    shortDescription:
      "Reverse Proxy, SSL, Static Serve, Load Balancer, Routing",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "AWS",
    shortDescription: "EC2, S3, RDS, IAM, Lambda",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  },
  [SkillNames.GO]: {
    id: 23,
    name: "go",
    label: "Go",
    shortDescription: "Goroutines, Channels, Packages, Interfaces, Defer",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  [SkillNames.PRISMA]: {
    id: 24,
    name: "prisma",
    label: "PRISMA",
    shortDescription: "ORM, Schema, Migrations, Generators, Providers",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
};
