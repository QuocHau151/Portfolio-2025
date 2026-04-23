"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/QuocHau151",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/quoc-hau-tran-8b74b9244/",
  },
];

export function SocialLinks() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center"
    >
      <h2 className="mb-3 text-2xl font-bold text-white">Kết nối với tôi</h2>
      <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
        Theo dõi tôi trên các nền tảng mạng xã hội để cập nhật các dự án mới
        nhất và chia sẻ kiến thức.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <social.icon size={16} className="text-primary" />
            {social.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
