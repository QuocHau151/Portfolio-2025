"use client";
import { FloatingDockMobile } from "@/components/ui/floating-dock";

export default function Dock() {
  
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full">
      <FloatingDockMobile />
    </div>
  );
}
