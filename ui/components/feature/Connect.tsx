"use client";
import { SiZalo } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { Headset, Phone } from "lucide-react";
import { FaFacebookMessenger } from "react-icons/fa";
import Script from "next/script";
import { useState } from "react";

export default function SocialConnect() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Script
        src="https://messenger.svc.chative.io/static/v1.0/channels/s9a4ba0f2-e74c-4e68-9d90-7f29e6c89b2d/messenger.js?mode=livechat"
        strategy="lazyOnload"
      />

      <div className="fixed bottom-4 left-3 z-50 flex cursor-pointer flex-col gap-5 md:bottom-24 md:left-auto md:right-5 md:gap-3">
        <AnimatePresence>
          {isOpen && (
            <div className="space-y-5">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                href="tel:0866561556"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-red-500"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-400 opacity-50"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <Phone className="h-6 w-6 text-white" />
                </motion.div>

                {/* Phone number that slides out */}
                <div className="absolute right-[120%] hidden items-center rounded-full bg-red-500 px-4 py-2 text-white opacity-0 transition-all duration-300 lg:group-hover:flex lg:group-hover:opacity-100">
                  <span className="whitespace-nowrap font-bold">
                    0866.561.556
                  </span>
                </div>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                href="https://m.me/xnkkhangminh"
                target="blank"
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0099FF]"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#0084FF] opacity-50"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <FaFacebookMessenger color={"white"} size={"25px"} />
                </motion.div>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                href="https://zalo.me/0866561556"
                target="blank"
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400 opacity-50"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <SiZalo color={"white"} size={"25px"} />
                </motion.div>
              </motion.a>
            </div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Headset className="h-6 w-6 text-white" />
          </motion.div>

          {/* Hover text */}
          <div className="absolute right-[120%] hidden items-center rounded-full bg-primary px-4 py-2 text-white opacity-0 transition-all duration-300 lg:group-hover:flex lg:group-hover:opacity-100">
            <span className="whitespace-nowrap font-medium">Liên hệ</span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
