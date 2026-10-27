"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForgotPassword } from "@/queries/useAuth";
import { resetPasswordSchema } from "@/schemas/auth.schema";
import { useAppStore } from "@/stores/app";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleErrorApi } from "@/libs/utils";

export function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { forgotPasswordForm, verifyCode, setForgotPasswordForm, setCode } =
    useAppStore();
  const forgotPassword = useForgotPassword();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    if (forgotPassword.isPending) return;
    if (!forgotPasswordForm?.email || !verifyCode?.code) {
      toast.error("Vui lòng xác thực email trước khi đổi mật khẩu");
      router.replace("/forgot-password");
      return;
    }
    try {
      await forgotPassword.mutateAsync({
        ...data,
        email: forgotPasswordForm.email,
        code: verifyCode.code,
      });
      setForgotPasswordForm();
      setCode();
      toast.success(
        "Đổi mật khẩu thành công. Vui lòng đăng nhập bằng mật khẩu mới",
      );
      router.replace("/login");
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  }

  return (
    <Card className="w-full max-w-md bg-neutral-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center">
          Hãy nhập mật khẩu mới cho tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className="relative mt-2">
                    <FormControl>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showNewPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <div className="relative mt-2">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <KeyRound className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
