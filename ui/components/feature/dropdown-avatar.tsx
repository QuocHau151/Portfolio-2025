"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleErrorApi } from "@/libs/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useAppStore } from "@/stores/app";
import { ChevronDown, ChevronUp, LogOut, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

export default function DropdownAvatar() {
  const { isAuth, account, role, setRole, disconnectSocket } = useAppStore();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const [jobManagementOpen, setJobManagementOpen] = React.useState(true);
  const [cvManagementOpen, setCvManagementOpen] = React.useState(true);
  const [emailSettingsOpen, setEmailSettingsOpen] = React.useState(false);
  const [personalSecurityOpen, setPersonalSecurityOpen] = React.useState(false);
  const [accountUpgradeOpen, setAccountUpgradeOpen] = React.useState(false);

  const logout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      setRole();
      disconnectSocket();
      toast("Đăng xuất thành công");
      router.push("/");
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };

  // If not authenticated, show sign in link
  if (!isAuth || !account) {
    return (
      <Link href={"/login"} className="flex items-center">
        <span className="text-[16px] font-light text-white">Sign In</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2">
          <div className="bg-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-black uppercase">
            {account.avatar ? (
              <Image
                src={account.avatar || "/placeholder.svg"}
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
                width={40}
                height={40}
              />
            ) : (
              account.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")
            )}
          </div>
          <ChevronDown className="absolute right-4 bottom-2 size-4 rounded-full bg-white text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-3 w-80 rounded-xl bg-white text-black"
        align="end"
      >
        {/* User Info Header */}
        <div className="border-b p-2">
          <div className="flex items-center gap-5">
            <div className="bg-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-sm font-medium uppercase">
              {account.avatar ? (
                <Image
                  src={account.avatar || "/placeholder.svg"}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover"
                  width={48}
                  height={48}
                />
              ) : (
                account.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
              )}
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-semibold">{account.name}</h3>
              <p className="text-xs font-medium text-green-600">
                Tài khoản đã xác thực
              </p>
              <p className="text-xs text-gray-500">
                {role === "ADMIN" ? "Quản trị viên" : "Người dùng"} |{" "}
                {account.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2">
          {/* Dashboard/Admin Panel */}
          <div className="">
            {role === "ADMIN" ? (
              <Link href={"/admin"} className="w-full">
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-start p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded p-1">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Bảng điều khiển</span>
                  </div>
                </Button>
              </Link>
            ) : (
              <Link href={"/dashboard"} className="w-full">
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-start p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded p-1">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Dashboard</span>
                  </div>
                </Button>
              </Link>
            )}
          </div>

          {/* Email Settings Section */}
          <Collapsible
            open={emailSettingsOpen}
            onOpenChange={setEmailSettingsOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto w-full justify-between p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded p-1">
                    <Mail className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">
                    Cài đặt email & thông báo
                  </span>
                </div>
                {emailSettingsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-10 space-y-1">
              <Button
                variant="ghost"
                className="h-8 w-full justify-start text-sm text-gray-600"
              >
                Cài đặt thông báo
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-full justify-start text-sm text-gray-600"
              >
                Cài đặt email
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Personal & Security Section */}
          <Collapsible
            open={personalSecurityOpen}
            onOpenChange={setPersonalSecurityOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto w-full justify-between p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded bg-gray-100 p-1">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium">Cá nhân & Bảo mật</span>
                </div>
                {personalSecurityOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-10 space-y-1">
              {role === "ADMIN" ? (
                <Link href={"/admin/setting"} className="w-full">
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start text-sm text-gray-600"
                  >
                    Hồ sơ cá nhân
                  </Button>
                </Link>
              ) : (
                <Link href={"/dashboard/setting"} className="w-full">
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start text-sm text-gray-600"
                  >
                    Hồ sơ cá nhân
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                className="h-8 w-full justify-start text-sm text-gray-600"
              >
                Đổi mật khẩu
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Logout Button */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-center gap-2 bg-neutral-800 text-white"
            onClick={logout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
            {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
