"use client";
import { LoaderCircle, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSearchParamsLoader } from "@/components/feature/search-params-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSocketInstace } from "@/libs/socket";
import { GoogleLoginUrl } from "@/libs/utils";
import { useLoginMutation } from "@/queries/useAuth";
import { LoginBody, LoginBodyType } from "@/schemas/auth.schema";
import { useAppStore } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const { searchParams } = useSearchParamsLoader();
  const loginMutation = useLoginMutation();
  const clearTokens = searchParams?.get("clearTokens");

  const { setRole, setAccount, setSocket } = useAppStore();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (clearTokens) {
      setRole();
    }
  }, [clearTokens, setRole]);
  const onSubmit = async (data: LoginBodyType) => {
    // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
    // Nếu không pass qua vòng này thì sẽ không gọi api
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data);
      toast("Đăng nhập thành công");
      setRole(result.payload.data.account.role);
      setAccount(result.payload.data.account);
      setSocket(generateSocketInstace(result.payload.data.accessToken));

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast("Đăng nhập thất bại");
    }
  };

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Đăng nhập
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          Đăng nhập vào tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState: { errors } }) => (
              <FormItem>
                <Label htmlFor="identifier" className="text-zinc-300">
                  Email hoặc số điện thoại
                </Label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Email hoặc số điện thoại"
                    className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                    {...field}
                    required
                  />
                </div>
                <div className="text-sm text-red-500">
                  {errors.email?.message === "invalidEmail"
                    ? "Sai Định Dạng Email"
                    : errors.email?.message}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState: { errors } }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-300">
                    Mật khẩu
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                    {...field}
                    required
                  />
                </div>
                <div className="text-sm text-red-500">
                  {errors.password?.message === "minmaxPassword"
                    ? "Password tối thiểu 6 ký tự"
                    : errors.password?.message}
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-zinc-700"
            />
            <Label
              htmlFor="remember"
              className="text-sm leading-none font-medium text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ghi nhớ mật khẩu
            </Label>
          </div>

          <Button type="submit" className="w-full">
            {loginMutation.isPending && (
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            )}
            Đăng nhập
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>
          <Link href={GoogleLoginUrl}>
            <Button
              type="button"
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
          </Link>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-center text-sm text-zinc-400">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
