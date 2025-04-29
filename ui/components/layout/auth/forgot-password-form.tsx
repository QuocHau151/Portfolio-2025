"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log({
        method: activeTab,
        value: activeTab === "email" ? email : phone,
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Quên mật khẩu
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          {!isSubmitted
            ? "Nhập email hoặc số điện thoại để đặt lại mật khẩu"
            : "Hướng dẫn đặt lại mật khẩu đã được gửi"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:bg-zinc-700"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="phone"
                  className="data-[state=active]:bg-zinc-700"
                >
                  Số điện thoại
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
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
                      required={activeTab === "email"}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-zinc-500" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Số điện thoại"
                      className="border-zinc-700 bg-zinc-800 pl-10 text-white placeholder:text-zinc-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={activeTab === "phone"}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Gửi hướng dẫn đặt lại
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <p className="text-zinc-300">
                {activeTab === "email"
                  ? `Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến ${email}. Vui lòng kiểm tra hộp thư của bạn.`
                  : `Chúng tôi đã gửi mã xác nhận đến số điện thoại ${phone}. Vui lòng kiểm tra tin nhắn của bạn.`}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
              onClick={() => setIsSubmitted(false)}
            >
              Gửi lại
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/"
          className="text-primary flex items-center text-sm font-medium hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  );
}
