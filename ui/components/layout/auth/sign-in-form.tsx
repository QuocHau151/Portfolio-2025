"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ identifier, password, rememberMe });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-zinc-300">
              Email hoặc số điện thoại
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="identifier"
                type="text"
                placeholder="Email hoặc số điện thoại"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
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
                id="password"
                type="password"
                placeholder="Mật khẩu"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

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

          <Button
            type="button"
            variant="outline"
            className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
            onClick={() => {
              // Handle Google sign-in
              console.log("Google sign-in");
            }}
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
