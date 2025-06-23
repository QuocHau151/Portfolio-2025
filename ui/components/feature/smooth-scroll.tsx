"use client";

import { ReactLenis, useLenis } from "@/libs/lenis";
import React from "react";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const lenis = useLenis(({ scroll }) => {
    console.log(scroll);
  });

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        prevent: (node: HTMLElement) => {
          // Ngăn Lenis khi ở trong modal
          if (isInsideModal) return true;
          // Ngăn Lenis khi node có lớp modal
          if (node.classList.contains("modal")) return true;
          // Ngăn Lenis khi node hoặc cha của nó có lớp no-smooth-scroll
          return (
            node.classList.contains("no-smooth-scroll") ||
            !!node.closest(".no-smooth-scroll")
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
