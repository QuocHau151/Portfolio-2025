"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone } from "lucide-react";

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

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      agreeTerms,
    });
  };

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Đăng ký
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          Tạo tài khoản mới
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-zinc-300">
              Họ và tên
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="fullName"
                type="text"
                placeholder="Họ và tên"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-300">
              Số điện thoại
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="Số điện thoại"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Mật khẩu
            </Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-zinc-300">
              Xác nhận mật khẩu
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-zinc-700"
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-none font-medium text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tôi đồng ý với{" "}
              <Link href="/terms" className="text-primary hover:underline">
                điều khoản
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                chính sách bảo mật
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={!agreeTerms}>
            Đăng ký
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
            onClick={() => {
              // Handle Google sign-up
              console.log("Google sign-up");
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
          Đã có tài khoản?{" "}
          <Link href="/" className="text-primary font-medium hover:underline">
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
