"use client";
import {
  BarChartIcon,
  BookPlus,
  Component,
  DollarSign,
  HelpCircleIcon,
  LayoutDashboardIcon,
  PlusCircleIcon,
  SettingsIcon,
  SquareActivity,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAppStore } from "@/stores/app";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: LayoutDashboardIcon,
    },

    {
      title: "Dịch vụ",
      url: "/service",
      icon: BarChartIcon,
    },
    {
      title: "Thanh Toán",
      url: "/payment",
      icon: DollarSign,
    },
    {
      title: "Thống Kê",
      url: "/analytic",
      icon: SquareActivity,
    },
    {
      title: "Component",
      url: "/component",
      icon: Component,
    },
    {
      title: "Blog",
      url: "/blog",
      icon: BookPlus,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/setting",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { account } = useAppStore();
  const pathName = usePathname();
  const segments = pathName.split("/");
  const secondSegment = `/${segments[2]}`;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image src={"/logo/light.png"} alt="" width={30} height={30} />
                <span className="text-base font-semibold">Quochau.com</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <PlusCircleIcon color="black" />
                  <span className="text-black">Request Create</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu className="mt-2 space-y-1">
              {data.navMain.map((item) => (
                <Link
                  href={`/dashboard${item.url}`}
                  key={item.title}
                  className="cursor-pointer"
                >
                  <SidebarMenuItem
                    className={`${
                      (item.url === "" &&
                        (secondSegment === "/" || !segments[2])) ||
                      secondSegment === `${item.url}`
                        ? "rounded-lg bg-white text-black"
                        : ""
                    }`}
                  >
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser account={account || undefined} />
      </SidebarFooter>
    </Sidebar>
  );
}
