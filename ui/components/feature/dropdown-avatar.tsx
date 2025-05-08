"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { handleErrorApi } from "@/libs/utils";
import { useLogoutMutation } from "@/queries/useAuth";

import { useAppStore } from "@/stores/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DropdownAvatar() {
  const { isAuth, account, role, setRole, disconnectSocket } = useAppStore();

  const logoutMutation = useLogoutMutation();
  const router = useRouter();

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAuth === true && account ? (
          <div className="bg-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-black uppercase">
            {account.avatar ? (
              <Image
                src={account.avatar}
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
                width={40}
                height={40}
              />
            ) : (
              account.name
                .split(" ")
                .slice(0, 2) // lấy 2 từ đầu tiên
                .map((word) => word[0]) // lấy chữ cái đầu
                .join("")
            )}
          </div>
        ) : (
          <Link href={"/login"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Sign In</span>
          </Link>
        )}
      </DropdownMenuTrigger>
      {isAuth === true && account && (
        <DropdownMenuContent align="end" className="mt-2 space-y-2 bg-black">
          <DropdownMenuItem asChild className="group h py- border-b">
            {role === "ADMIN" ? (
              <Link href={"/admin"} className="w-full cursor-pointer">
                <p className="">Bảng điều khiển</p>
              </Link>
            ) : (
              <Link
                href={"/dashboard"}
                className="w-full cursor-pointer text-black"
              >
                Dashboard
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="h cursor-pointer border-b py-2">
            Hồ Sơ Cá Nhân
          </DropdownMenuItem>
          <DropdownMenuItem className="h cursor-pointer py-2" onClick={logout}>
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
