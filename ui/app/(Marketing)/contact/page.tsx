"use client";

import { ContactForm } from "@/components/layout/contact/contact-form";
import { ContactInfo } from "@/components/layout/contact/contact-info";
import { SocialLinks } from "@/components/layout/contact/contact-link";
import { motion } from "framer-motion";
import { LocateIcon, Mail, Phone } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "tranlequochau.blc@gmail.com",
    href: "mailto:tranlequochau.blc@gmail.com",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "0399 603 123",
    href: "tel:0399603123",
  },
  {
    icon: LocateIcon,
    label: "Địa chỉ",
    value: "TP HCM, Việt Nam",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-6">
      {/* Hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16 text-center"
      >
        <motion.div variants={fadeInUp}>
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            Liên hệ
          </span>
        </motion.div>
        <motion.h1
          variants={fadeInUp}
          className="mt-4 text-3xl font-bold text-white md:text-5xl"
        >
          <span className="text-gradient">Liên Hệ</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-2xl text-muted-foreground"
        >
          Hãy liên hệ với tôi để thảo luận về dự án của bạn. Tôi luôn sẵn sàng
          hỗ trợ bạn xây dựng các giải pháp công nghệ hiệu quả.
        </motion.p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {contactCards.map((card) => (
          <motion.a
            key={card.label}
            href={card.href}
            variants={fadeInUp}
            className="group flex flex-col items-center rounded-2xl border border-white/5 bg-surface-elevated p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
              <card.icon size={22} />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-white">
              {card.label}
            </h3>
            <p className="text-sm text-muted-foreground">{card.value}</p>
          </motion.a>
        ))}
      </motion.div>

      {/* Tech Stack Info */}
      <div className="mb-16">
        <ContactInfo />
      </div>

      {/* Social Links */}
      <div className="mb-16">
        <SocialLinks />
      </div>

      {/* Form Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto max-w-2xl"
      >
        <motion.div variants={fadeInUp}>
          <ContactForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
