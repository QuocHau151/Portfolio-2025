"use client";
import { FloatingDockMobile } from "@/components/ui/floating-dock";
import { Role } from "@/constants/type";
import { useAppStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { FaCartPlus, FaHome, FaUser } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

export default function Dock() {
  const { role } = useAppStore();
  const { cart } = useCartStore();

  const items = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      link: "/dashboard",
    },
    {
      title: "Storage",
      icon: <GrStorage />,
      link: "/dashboard/service",
    },
    {
      title: "Home",
      icon: <FaHome />,
      link: "/",
    },
    {
      title: "Cart",
      icon: (
        <div className="relative">
          <FaCartPlus />
          <span className="absolute -top-2 -right-2 inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-[8px] font-medium text-white">
            {cart.length}
          </span>
        </div>
      ),
      link: "/cart",
    },
    {
      title: "User",
      icon: <FaUser />,
      link: role === Role.Admin ? "/admin/setting" : "/dashboard/setting",
    },
  ];
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full">
      <FloatingDockMobile items={items} className="" />
    </div>
  );
}
