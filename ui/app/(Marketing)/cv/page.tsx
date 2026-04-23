"use client";

import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SiZalo } from "react-icons/si";
import StackIcon from "tech-stack-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import SmoothScroll from "@/components/feature/smooth-scroll";
import BlurText from "@/components/ui/blurText";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import projects from "@/data/projects";

const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
  subject: z.string().min(1, "Vui lòng nhập chủ đề"),
  note: z.string(),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function CV() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast.success("Đã gửi thông tin! Tôi sẽ liên hệ lại sớm.");
      console.log(values);
      form.reset();
    } catch (error) {
      toast.error("Gửi thất bại. Vui lòng thử lại.");
    }
  }

  return (
    <SmoothScroll>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Profile Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-[320px] xl:w-[360px] lg:shrink-0">
            <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface-elevated">
              {/* Avatar */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/assets/logo/avt.jpeg"
                  alt="Trần Lê Quốc Hậu"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated to-transparent" />
              </div>

              {/* Info */}
              <div className="relative -mt-12 px-6 pb-6 text-center">
                <div className="mx-auto mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Fullstack Developer
                </div>
                <h2 className="text-xl font-bold text-white">Trần Lê Quốc Hậu</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  tranlequochau.blc@gmail.com
                </p>

                {/* Social Links */}
                <div className="mt-5 flex justify-center gap-3">
                  {[
                    { icon: Facebook, href: "https://www.facebook.com/quochau151/" },
                    { icon: SiZalo, href: "zalo:0399603123", isIcon: true },
                    { icon: Github, href: "https://github.com/QuocHau151" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/h%E1%BA%ADu-qu%E1%BB%91c-16426936b" },
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    >
                      {social.isIcon ? (
                        <social.icon size={18} />
                      ) : (
                        <social.icon className="h-4 w-4" />
                      )}
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 space-y-3">
                  <Link
                    href="mailto:tranlequochau.blc@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    Hire Me Now
                  </Link>
                  <Link
                    href="/assets/Tran-Le-Quoc-Hau-Fullstack-Developer.pdf"
                    download
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download CV
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 space-y-20">
            {/* Introduction */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Giới thiệu
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl font-black leading-tight md:text-4xl lg:text-5xl"
              >
                <BlurText
                  text="Hello, I'm Quoc Hau"
                  delay={300}
                  animateBy="words"
                  direction="top"
                  className="text-primary inline"
                />
                <br />
                <span className="text-white">
                  Developer Web Application All In JS, TS & SEO Marketing
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="max-w-xl text-base leading-relaxed text-muted md:text-lg"
              >
                Tôi là lập trình viên web đam mê tạo ra các ứng dụng web động và
                responsive. Có kinh nghiệm cả front-end lẫn back-end, luôn sẵn sàng
                học hỏi công nghệ mới và nâng cao kỹ năng.
              </motion.p>
            </motion.section>

            {/* Stats */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                { label: "Địa điểm", value: "Thủ Đức, HCM", icon: MapPin },
                { label: "Kinh nghiệm", value: "+2 Năm" },
                { label: "Dự án", value: "+10" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center transition-colors hover:border-white/10"
                >
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="mt-1 text-2xl font-extrabold text-white">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* About */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Về tôi
                </span>
              </motion.div>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <motion.div variants={fadeInUp} className="w-full">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Kinh nghiệm Fullstack Developer
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    Mục tiêu trở thành Senior Fullstack Developer trong 2 năm tới
                    bằng cách không ngừng cải thiện kỹ năng kỹ thuật, mở rộng kiến
                    thức công nghệ mới và học Flutter để xây dựng ứng dụng di động.
                    Khát khao được đóng góp vào các dự án có tác động thực tế trong
                    môi trường làm việc chuyên nghiệp và năng động.
                  </p>
                  <Link
                    href="/assets/Tran-Le-Quoc-Hau-Fullstack-Developer.pdf"
                    download
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download CV
                  </Link>
                </motion.div>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Kỹ năng
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  Tech Stack
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skillGroups.map((group, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-white/10"
                  >
                    <h3 className="mb-4 text-base font-semibold text-primary">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {group.icons.map((icon, j) =>
                        typeof icon === "string" ? (
                          <StackIcon
                            key={j}
                            className="size-7 rounded-md"
                            name={icon}
                          />
                        ) : (
                          <div key={j} className="flex items-center">
                            {icon}
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Companies + Education */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {/* Companies */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Công ty
                </span>
                <h2 className="text-xl font-bold text-white">
                  Đã từng làm việc
                </h2>
                <div className="space-y-3">
                  {[
                    { logo: "/assets/logo/fpt.png", name: "FPT SmartHome" },
                    { logo: "/assets/logo/sikido.png", name: "Sikido" },
                    { logo: "/assets/logo/khangminh.png", name: "Khang Minh Lighting" },
                  ].map((company, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-white">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Học vấn
                </span>
                <h2 className="text-xl font-bold text-white">Bằng cấp</h2>
                <div className="space-y-3">
                  {[
                    {
                      title: "Cử Nhân Kinh Tế Học",
                      school: "Đại Học Kinh Tế Luật",
                      year: "2020 - 2024",
                    },
                    {
                      title: "Complete FrontEnd Course",
                      school: "CFD Circle",
                      year: "2021 - 2022",
                    },
                  ].map((edu, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-5"
                    >
                      <h3 className="text-base font-semibold text-primary">
                        {edu.title}
                      </h3>
                      <p className="mt-1 text-sm text-white">{edu.school}</p>
                      <span className="absolute top-4 right-4 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.section>

            {/* Projects */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Dự án
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  Dự án gần đây
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl"
                  >
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={project.src}
                          alt={project.title}
                          fill
                          className="object-cover object-[50%_0%] transition-all duration-[3000ms] ease-linear group-hover:object-[50%_100%] group-hover:scale-105 group-hover:brightness-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
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
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Contact */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
                  Liên hệ
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  Hãy cùng hợp tác
                </h2>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-10"
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Họ và tên *"
                              className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email *"
                              type="email"
                              className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Số điện thoại *"
                              className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Chủ đề *"
                              className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormControl>
                            <Textarea
                              placeholder="Lời nhắn..."
                              rows={4}
                              className="resize-none border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <Button
                        type="submit"
                        className="bg-primary px-8 py-3 font-bold text-black transition-transform hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
                      >
                        Gửi liên hệ
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </motion.section>
          </main>
        </div>
      </div>
    </SmoothScroll>
  );
}

const skillGroups = [
  {
    title: "Frontend",
    icons: [
      "html5",
      "css3",
      "js",
      "typescript",
      "reactjs",
      "nextjs2",
      "tailwindcss",
      "framer",
      "gsap",
      "radixui",
      "reactquery",
      "sass",
      "shadcnui",
      "threejs",
    ],
  },
  {
    title: "Backend",
    icons: [
      "typescript",
      "nodejs",
      "mongodb",
      "nestjs",
      "nextjs2",
      "postgresql",
      "postman",
      "prisma",
      "redis",
      "resend",
      "supabase",
      "swagger",
      "zod",
      "elastic",
      "jest",
    ],
  },
  {
    title: "DevOps",
    icons: [
      "linux",
      "ubuntu",
      "docker",
      "kubernetes",
      "git",
      "github",
      "cloudflare",
      "grafana",
      "gcloud",
      "kibana",
    ],
  },
  {
    title: "Server Management",
    icons: [
      <Image
        key="proxmox"
        src="/assets/logo/proxmox.png"
        width={28}
        height={28}
        alt="Proxmox"
        className="rounded"
      />,
      "linux",
      "ubuntu",
    ],
  },
  {
    title: "Designer",
    icons: ["ps", "ai", "figma"],
  },
  {
    title: "SEO Marketing",
    icons: [
      <Image key="n8n" src="/assets/logo/n8n.png" width={60} height={28} alt="n8n" />,
      <Image key="gg" src="/assets/logo/gg.jpg" width={50} height={28} alt="Google" />,
      <Image key="ga4" src="/assets/logo/ga4.png" width={60} height={28} alt="GA4" />,
      <Image key="semrush" src="/assets/logo/semrush.png" width={60} height={28} alt="Semrush" />,
    ],
  },
];

