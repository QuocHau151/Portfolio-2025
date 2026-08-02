"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 min-h-[90vh] w-full py-24 md:py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-primary/20 bg-primary/5 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-elevated p-2 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/assets/logo/avt.jpeg"
                  alt="Quoc Hau"
                  fill
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-cover object-top grayscale-[20%] transition duration-700 hover:scale-105 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between text-xs text-white/80">
                  <span className="font-mono tracking-[0.18em] uppercase">Quoc Hau / 2025</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> HCMC</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
              <Sparkles className="h-4 w-4" /> About the builder
            </div>
            <h2 className="text-3xl leading-tight font-black tracking-tight text-white md:text-5xl">
              I turn complex ideas into clear, reliable digital products.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              I&apos;m Quoc Hau, a full-stack developer working across product interfaces, backend systems and infrastructure. This space brings together the products, experiments and lessons behind my work.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Focus", "Product systems"],
                ["Mode", "Build end-to-end"],
                ["Base", "Ho Chi Minh City"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-white"
            >
              Read my profile
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
