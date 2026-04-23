"use client";

import { motion } from "framer-motion";
import { Database, Laptop, Server, Wrench } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stacks = [
  {
    icon: Laptop,
    title: "Frontend",
    desc: "React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: Server,
    title: "Backend",
    desc: "NestJS, Node.js, Express, Prisma",
  },
  {
    icon: Database,
    title: "Database",
    desc: "PostgreSQL, MongoDB, Redis",
  },
  {
    icon: Wrench,
    title: "DevOps",
    desc: "Ubuntu, Docker, PM2, Nginx",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="text-center"
    >
      <motion.h2
        variants={fadeInUp}
        className="mb-3 text-2xl font-bold text-white md:text-3xl"
      >
        Làm việc cùng nhau
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="mx-auto mb-8 max-w-2xl text-muted-foreground"
      >
        Với kinh nghiệm làm việc với TypeScript, Next.js và NestJS, tôi có thể
        giúp bạn xây dựng các ứng dụng web hiện đại, hiệu suất cao và dễ bảo trì.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stacks.map((stack) => (
          <motion.div
            key={stack.title}
            variants={fadeInUp}
            className="group rounded-2xl border border-white/5 bg-surface-elevated p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <stack.icon size={18} />
            </div>
            <h3 className="mb-1 font-semibold text-white">{stack.title}</h3>
            <p className="text-sm text-muted-foreground">{stack.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
