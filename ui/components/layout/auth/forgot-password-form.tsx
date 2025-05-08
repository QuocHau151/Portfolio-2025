"use client";

import { ArrowLeft, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleErrorApi } from "@/libs/utils";
import { useCheckEmailExits, useSendOTP } from "@/queries/useAuth";
import { useAppStore } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const [activeTab, setActiveTab] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checkEmailExitsMutation = useCheckEmailExits();
  const sendOTP = useSendOTP();
  const { setForgotPasswordForm } = useAppStore();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
      }),
    ),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: { email: string }) => {
    try {
      if (checkEmailExitsMutation.isPending) return;
      const result = await checkEmailExitsMutation.mutateAsync({
        email: data.email,
      });
      setIsSubmitting(true);
      const payload = result.payload as { data: { message: string } };
      if (Boolean(payload.data.message) === true) {
        if (data) {
          setForgotPasswordForm(data);
          await sendOTP.mutateAsync({
            email: data.email,
            type: "FORGOT_PASSWORD",
          });
          toast("Đã gửi Mã OTP vào Email của bạn");
          router.push("/verify-account?type=FORGOT_PASSWORD");
        }
      } else {
        toast("Email Không Tồn Tại");
      }

      setIsSubmitting(false);
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Quên mật khẩu
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          Nhập email hoặc số điện thoại để đặt lại mật khẩu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
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
                        {...field}
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
              <div className="space-y-2"></div>
            </TabsContent>

            <TabsContent value="phone" className="mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
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
                        {...field}
                        required={activeTab === "phone"}
                      />
                    </div>
                    <div className="text-sm text-red-500">
                      {errors.email?.message === "invalidEmail"
                        ? "Sai Định Dạng PhoneNumber"
                        : errors.email?.message}
                    </div>
                  </FormItem>
                )}
              />
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
                Gửi
              </>
            )}
          </Button>
        </form>
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
